import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

import { API } from '../../config';
import { SearchContext } from '../../contexts/SearchContext';
import { HIDE, SHOW } from '../../contexts/SearchContext/action';
import { UserContext } from '../../contexts/UserContext';
import { getDataLocalStorage } from '../../helper';
import Loader from '../utils/Loader';

const DetailProperty = () => {
  const socket = useRef();
  const router = useHistory();
  const { id } = useParams();

  const [show, setshow] = useState(false);

  const { state: stateUser } = useContext(UserContext);
  const { dispatch: dispatchSearch } = useContext(SearchContext);

  useEffect(() => {
    dispatchSearch({ type: HIDE });

    if (stateUser.user.role === 'tenant') {
      router.push('/');
    }

    // connect socket and trigger
    const user = getDataLocalStorage({ key: 'user' });
    const token = getDataLocalStorage({ key: 'token' });

    socket.current = io.connect('http://localhost:5000', {
      transports: ['websocket'],
      query: {
        token,
        email: user.email,
      },
    });

    socket.current.emit(
      'load-notification',
      getDataLocalStorage({ key: 'user' }).email,
    );
    // end trigger

    return () => {
      dispatchSearch({ type: SHOW });
      socket.current.disconnect();
    };
  }, []);

  const fetchHouseDetail = async (id) => {
    try {
      const response = await API.get(`house/${id}`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }

      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const { data, isSuccess, isError, isLoading } = useQuery(
    ['detail-house', id],
    () => fetchHouseDetail(id),
    {
      staleTime: 300000,
    },
  );

  const AlertDialogSucc = ({ show, handleClose, msg, router }) => {
    const handleClicked = () => {
      router.push('/owner');
      handleClose();
    };

    return (
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>{msg}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClicked}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container fluid className="bg-identity">
      <Container className="py-5">
        <h4>Detail House</h4>
        <Container className="mt-5">
          {isSuccess && (
            <Form autoComplete="off">
              <Form.Group>
                <Form.Label className="font-weight-bold">Name House</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.name}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">City</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.city.name}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.address}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Price</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.price}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">
                  Type Of Rent
                </Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.typeRent}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Amenities</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.amenities.join(', ')}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Bedroom</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.bedroom}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Bathroom</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.bathroom}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Area</Form.Label>
                <Form.Control
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.area}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">
                  Description
                </Form.Label>
                <Form.Control
                  as="textarea"
                  className="bg-identity font-weight-bold"
                  type="text"
                  disabled={true}
                  value={data.description}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="font-weight-bold">Images</Form.Label>
                <Container fluid className="d-flex px-0">
                  <Container
                    fluid
                    className="px-0 mx-2 d-flex justify-content-center align-items-center"
                    style={{
                      width: '45%',
                      border: '1px solid black',
                      borderRadius: '25px',
                      position: 'relative',
                      backgroundColor: data.image && 'grey',
                    }}
                  >
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{
                        width: '100%',
                        height: '190px',
                      }}
                    >
                      {!data.image ? (
                        <span style={{ fontSize: '4.4em' }}>
                          <i
                            className="fa fa-file-image-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                      ) : (
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={data.image}
                          alt="First Img"
                        />
                      )}
                    </div>
                  </Container>

                  <Container
                    fluid
                    className="px-0 mx-2 d-flex justify-content-center align-items-center"
                    style={{
                      width: '45%',
                      border: '1px solid black',
                      borderRadius: '25px',
                      position: 'relative',
                      backgroundColor: data.imageFirst && 'grey',
                    }}
                  >
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{
                        width: '100%',
                        height: '190px',
                      }}
                    >
                      {!data.imageFirst ? (
                        <span style={{ fontSize: '4.4em' }}>
                          <i
                            className="fa fa-file-image-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                      ) : (
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={data.imageFirst}
                          alt="First Img"
                        />
                      )}
                    </div>
                  </Container>

                  <Container
                    fluid
                    className="px-0 mx-2 d-flex justify-content-center align-items-center"
                    style={{
                      width: '45%',
                      border: '1px solid black',
                      borderRadius: '25px',
                      position: 'relative',
                      backgroundColor: data.imageSecond && 'grey',
                    }}
                  >
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{
                        width: '100%',
                        height: '190px',
                      }}
                    >
                      {!data.imageSecond ? (
                        <span style={{ fontSize: '4.4em' }}>
                          <i
                            className="fa fa-file-image-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                      ) : (
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={data.imageSecond}
                          alt="First Img"
                        />
                      )}
                    </div>
                  </Container>

                  <Container
                    fluid
                    className="px-0 mx-2 d-flex justify-content-center align-items-center"
                    style={{
                      width: '45%',
                      border: '1px solid black',
                      borderRadius: '25px',
                      position: 'relative',
                      backgroundColor: data.imageThird && 'grey',
                    }}
                  >
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{
                        width: '100%',
                        height: '190px',
                      }}
                    >
                      {!data.imageThird ? (
                        <span style={{ fontSize: '4.4em' }}>
                          <i
                            className="fa fa-file-image-o"
                            aria-hidden="true"
                          ></i>
                        </span>
                      ) : (
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={data.imageThird}
                          alt="First Img"
                        />
                      )}
                    </div>
                  </Container>
                </Container>
              </Form.Group>
            </Form>
          )}
          {isLoading && <Loader />}
          {isError && <h2>There was an error processing your request....</h2>}
        </Container>
        {show && (
          <AlertDialogSucc
            show={show}
            router={router}
            handleClose={() => setshow(false)}
            msg="Successfully Add House"
          />
        )}
      </Container>
    </Container>
  );
};

export default DetailProperty;
