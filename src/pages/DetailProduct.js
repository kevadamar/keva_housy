import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';

import ImageWrapperDetail from '../components/ImageWrapperDetail';
import ButtonReuse from '../components/utils/ButtonReuse';
import { SearchContext } from '../contexts/SearchContext';

import bed1 from '../assets/images/bed 1.png';
import bath1 from '../assets/images/bath 1.png';
import ModalOrder from '../components/ModalOrder';

import { UserContext } from '../contexts/UserContext';
import { ADD_NEW_USER, LOGIN } from '../contexts/UserContext/action';
import ModalSignin from '../components/ModalSignin';
import ModalSignup from '../components/ModalSignup';
import {
  changeFormatDate,
  formatNumberToIDR,
  saveToLocalStorage,
} from '../helper';
import { API } from '../config';
import Loader from '../components/utils/Loader';

const DetailProduct = () => {
  const router = useHistory();

  const { dispatch } = useContext(SearchContext);
  const { state: userState, dispatch: dispatchUser } = useContext(UserContext);

  const { id } = useParams();

  const [showModal, setShowModal] = useState(false);

  //state handle modal box
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    nameSignIn: 'signIn',
    nameSignUp: 'signUp',
  });

  const loadDataById = async (id) => {
    try {
      const newid = parseInt(id);
      const response = await API.get(`house/${newid}`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const postDataBooking = async (payload) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await API.post('booking', payload, config);

      if (response.status !== 201) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    `detail-house-${id}`,
    async () => await loadDataById(id),
  );

  const mutation = useMutation(postDataBooking, {
    onSuccess: () => {
      console.log('success');
      setShowModal(false);
      router.push('/booking');
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  useEffect(() => {
    dispatch({ type: 'HIDE' });
    return () => {
      dispatch({ type: 'SHOW' });
    };
  }, []);

  const handleSubmitBooking = (payload) => {
    payload = {
      ...payload,
      checkin: changeFormatDate(payload.checkin),
      checkout: changeFormatDate(payload.checkout),
      house_id: data.id,
      total: data.price,
      status: 1,
    };

    // setShowModal(false);
    mutation.mutate(payload);
  };

  const handleShowModalOrder = () => {
    if (!userState.isLogin) {
      handleModalShow({ name: show.nameSignIn });
    } else {
      setShowModal(true);
    }
  };

  const handleModalShow = ({ name }) => {
    setShow((currentState) => ({
      ...currentState,
      [name]: !currentState[name],
    }));
  };

  // handle submit login
  const handleSubmitSignin = (payload) => {
    const { user, token } = payload;
    dispatchUser({ type: LOGIN, payload: user });
    saveToLocalStorage({ key: 'user', payload: user });
    saveToLocalStorage({ key: 'token', payload: token });
    handleModalShow({ name: show.nameSignIn });
  };

  // handle submit signup
  const handleSubmitSignup = (payload) => {
    dispatchUser({ type: ADD_NEW_USER, payload });
    handleModalShow({ name: show.nameSignUp });
    if (!userState.isSignUp) {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    }
  };

  const handleModalTo = ({ name }) => {
    if (name === 'signIn') {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    } else {
      setShow((currentState) => ({
        ...currentState,
        signIn: false,
        signUp: true,
      }));
    }
  };

  const DetailPropertyRoom = ({ name, qty }) => {
    if (name.toLowerCase() === 'beds') {
      return (
        <>
          <p className="text-secondary">Bedrooms</p>
          <span className="d-flex" style={{ alignItems: 'center' }}>
            <h5 className="mr-3 font-weight-bold">{qty}</h5>
            <img src={bed1} alt="bedroom icon" />
          </span>
        </>
      );
    }
    if (name.toLowerCase() === 'baths') {
      return (
        <>
          <p className="text-secondary">Bathrooms</p>
          <span className="d-flex" style={{ alignItems: 'center' }}>
            <h5 className="mr-3 font-weight-bold">{qty}</h5>
            <img src={bath1} alt="bathroom icon" />
          </span>
        </>
      );
    }
    return (
      <>
        <p className="text-secondary">Area</p>
        <span>
          <h5 className="font-weight-bold">{qty} ft</h5>
        </span>
      </>
    );
  };

  return (
    <Container
      fluid
      className="bg-identity"
      style={{ height: isLoading ? '100vh' : 'auto' }}
    >
      {isLoading && <Loader />}
      {isError && <h2>There was an error processing your request....</h2>}
      {isSuccess && (
        <Container className="py-4">
          <ImageWrapperDetail
            image={{
              image: data.image,
              imageFirst: data.imageFirst,
              imageSecond: data.imageSecond,
              imageThird: data.imageThird,
            }}
          />
          <Container className="px-5">
            <h2 className="font-weight-bold">{data.name}</h2>
            <div className="d-flex justify-content-between mt-4">
              <h3 className="font-weight-bold">
                Rp.{formatNumberToIDR(data.price)} / {data.typeRent}
              </h3>
              <span className="d-flex">
                <div className="ml-3">
                  <DetailPropertyRoom name="beds" qty={data.bedroom} />
                </div>
                <div className="ml-3">
                  <DetailPropertyRoom name="baths" qty={data.bathroom} />
                </div>
                <div className="ml-3">
                  <DetailPropertyRoom name="area" qty={data.area} />
                </div>
              </span>
            </div>
            <p>{data.address}</p>
            <h3 className="font-weight-bold">Description</h3>
            <p>{data.description}</p>
            <span className="d-flex justify-content-end">
              <ButtonReuse
                className="font-weight-bold my-2"
                style={{
                  backgroundColor: '#5A57AB',
                  color: ' white',
                  padding: '.375rem 2.75rem',
                }}
                onClick={handleShowModalOrder}
              >
                BOOK NOW
              </ButtonReuse>
            </span>
          </Container>
          {showModal && (
            <ModalOrder
              show={showModal}
              handleClose={() => setShowModal(false)}
              handleSubmitBooking={handleSubmitBooking}
            />
          )}
          {show.signIn && (
            <ModalSignin
              show={show.signIn}
              handleClose={() => handleModalShow({ name: show.nameSignIn })}
              handleTo={() => handleModalTo({ name: show.nameSignUp })}
              handleSubmitLogin={handleSubmitSignin}
            />
          )}
          {show.signUp && (
            <ModalSignup
              show={show.signUp}
              handleClose={() => handleModalShow({ name: show.nameSignUp })}
              handleTo={() => handleModalTo({ name: show.nameSignIn })}
              handleSubmitSignup={handleSubmitSignup}
            />
          )}
        </Container>
      )}
    </Container>
  );
};

export default DetailProduct;
