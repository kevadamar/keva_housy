import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import ImageWrapperDetail from '../components/ImageWrapperDetail';
import ButtonReuse from '../components/utils/ButtonReuse';
import { items as dataDummy } from '../data';
import { SearchContext } from '../contexts/SearchContext';

import bed1 from '../assets/images/bed 1.png';
import bath1 from '../assets/images/bath 1.png';
import ModalOrder from '../components/ModalOrder';

import { BookingContext } from '../contexts/BookingContext';
import { UserContext } from '../contexts/UserContext';
import {
  ADD_NEW_USER,
  LOGIN,
  SHOW_SIGN_IN,
} from '../contexts/UserContext/action';
import ModalSignin from '../components/ModalSignin';
import ModalSignup from '../components/ModalSignup';
import {
  getDataLocalStorage,
  removeDataLocalStorage,
  saveToLocalStorage,
} from '../helper';

const DetailProduct = () => {
  const router = useHistory();

  const { dispatch } = useContext(SearchContext);
  const { state: bookingState, dispatch: dispatchBooking } =
    useContext(BookingContext);
  const { state: userState, dispatch: dispatchUser } = useContext(UserContext);

  const { id } = useParams();
  const [data, setData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  //state handle modal box
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    nameSignIn: 'signIn',
    nameSignUp: 'signUp',
  });

  const loadDataById = (id) => {
    return dataDummy.find((dummy) => dummy.id === parseInt(id));
  };

  const handleSubmitBooking = (payload) => {
    payload = {
      ...payload,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
    };

    setShowModal(false);

    const bookingLocal = getDataLocalStorage({ key: 'booking' });
    const historyLocal = getDataLocalStorage({ key: 'history' });
    if (!bookingLocal) {
      const lastId = !historyLocal
        ? 1
        : historyLocal[historyLocal.length - 1].bookId + 1;
      const newBooking = [
        {
          bookId: lastId,
          houseName: 'Astina',
          user: userState.user,
          durationDate: payload,
          house: data,
          status: 1,
          orderedDate: new Date(),
        },
      ];
      if (getDataLocalStorage({ key: 'booking' }))
        removeDataLocalStorage({ key: 'booking' });
      saveToLocalStorage({ key: 'booking', payload: newBooking });
      dispatchBooking({ type: 'ADD', payload: newBooking });
    } else {
      const genId = bookingLocal[bookingLocal.length - 1].bookId + 1;
      const newBooking = bookingLocal;
      console.log(newBooking);
      newBooking.push({
        bookId: genId,
        houseName: 'Astina',
        user: userState.user,
        durationDate: payload,
        house: data,
        status: 1,
        orderedDate: new Date(),
      });
      if (getDataLocalStorage({ key: 'booking' }))
        removeDataLocalStorage({ key: 'booking' });
      saveToLocalStorage({ key: 'booking', payload: newBooking });
      dispatchBooking({ type: 'ADD', payload: newBooking });
    }

    router.push('/booking');
  };

  const handleShowModalOrder = () => {
    if (!userState.isLogin) {
      console.log(userState.isLogin);
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
    dispatchUser({ type: LOGIN, payload });
    saveToLocalStorage({ key: 'user', payload });
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

  useEffect(() => {
    dispatch({ type: 'HIDE' });
    setData(loadDataById(id));
    return () => {
      dispatch({ type: 'SHOW' });
    };
  }, []);

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
    <Container fluid className="bg-identity">
      {data && (
        <Container className="py-4">
          <ImageWrapperDetail />
          <Container className="px-5">
            <h2 className="font-weight-bold">Astina</h2>
            <div className="d-flex justify-content-between mt-4">
              <h3 className="font-weight-bold">
                {data.price} / {data.duration}
              </h3>
              <span className="d-flex">
                {data.detailPropertyRoom.map((item, index) => {
                  return (
                    <>
                      <div className="ml-3" key={index}>
                        <DetailPropertyRoom name={item.name} qty={item.qty} />
                      </div>
                    </>
                  );
                })}
              </span>
            </div>
            <p>{data.address}</p>
            <h3 className="font-weight-bold">Description</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
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
          <ModalOrder
            show={showModal}
            handleClose={() => setShowModal(false)}
            handleSubmitBooking={handleSubmitBooking}
          />
          <ModalSignin
            show={show.signIn}
            handleClose={() => handleModalShow({ name: show.nameSignIn })}
            handleTo={() => handleModalTo({ name: show.nameSignUp })}
            handleSubmitLogin={handleSubmitSignin}
          />
          <ModalSignup
            show={show.signUp}
            handleClose={() => handleModalShow({ name: show.nameSignUp })}
            handleTo={() => handleModalTo({ name: show.nameSignIn })}
            handleSubmitSignup={handleSubmitSignup}
          />
        </Container>
      )}
    </Container>
  );
};

export default DetailProduct;
