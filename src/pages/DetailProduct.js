import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageWrapperDetail from '../components/ImageWrapperDetail';
import ButtonReuse from '../components/utils/ButtonReuse';
import { items as dataDummy } from '../data';
import { SearchContext } from '../contexts/SearchContext';

import bed1 from '../assets/images/bed 1.png';
import bath1 from '../assets/images/bath 1.png';
import ModalOrder from '../components/ModalOrder';

const DetailProduct = () => {
  const { dispatch } = useContext(SearchContext);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const loadDataById = (id) => {
    return dataDummy.find((dummy) => dummy.id === parseInt(id));
  };

  const handleSubmitBooking = (payload) => {
    payload = {...payload, checkIn: convertToDate(payload.checkIn),checkOut: convertToDate(payload.checkOut)}
    console.log(payload);
    setShowModal(false)
  };

  const convertToDate = ( dateTime ) => {
    return new Date(dateTime).toISOString().split('T')[0].toString()
  }

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
            <h3 className="font-weight-bold mt-5">Description</h3>
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
                onClick={() => setShowModal(true)}
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
        </Container>
      )}
    </Container>
  );
};

export default DetailProduct;
