import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Table, Modal } from 'react-bootstrap';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

import noHomes from '../assets/images/no-homes.png';

import ButtonReuse from '../components/utils/ButtonReuse';
import Loader from '../components/utils/Loader';
import { API } from '../config';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';
import { formatNumberToIDR, getDataLocalStorage } from '../helper';

const MyHouse = () => {
  const socket = useRef();
  const router = useHistory();
  const queryClient = new QueryClient();

  const { dispatch } = useContext(SearchContext);
  const { state: stateUser } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [idOrder, setIdOrder] = useState('');

  const [page, setPage] = useState(1);
  const [countData, setCountData] = useState(0);

  const nextPage = () => {
    setPage((old) => old + 1);
  };
  const previousPage = () => {
    setPage((old) => old - 1);
  };

  const handleDelete = (idOrder) => {
    setIdOrder(idOrder);
    setShow(true);
  };

  const handleResetCache = async () => {
    console.log('remove cache');
    await queryClient.removeQueries(['owner-houses', 1], { exact: true });
  };

  useEffect(() => {
    dispatch({ type: HIDE });

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
      dispatch({ type: SHOW });
      socket.current.disconnect();
      handleResetCache();
    };
  }, []);

  const loadData = async (page = 1) => {
    try {
      const response = await API.get(`owner/houses?page=${page}`);

      // console.log(response);
      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      setCountData(response.data.countData);
      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const postData = async (id) => {
    try {
      const response = await API.delete(`house/${id}`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.message;
    } catch (error) {
      throw new Error('Interval Server Error');
    }
  };

  const { isLoading, data, isError, isSuccess, refetch } = useQuery(
    ['owner-houses', page],
    () => loadData(page),
  );

  const mutation = useMutation(postData, {
    onSuccess: async ({ data }) => {
      console.log(`data delete house`, data);
      setShow(false);
      refetch();
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const handleClickedOk = () => {
    mutation.mutate(idOrder);
  };

  return (
    <Container
      fluid
      className="bg-identity"
      style={{ height: isSuccess && data.length <= 10 && '87vh' }}
    >
      <Container className="py-5">
        <Container className="d-flex justify-content-between mb-2">
          <h4>My Houses</h4>
          <ButtonReuse
            onClick={() => router.push('/owner/add')}
            style={{
              backgroundColor: '#5A57AB',
              borderColor: '#5A57AB',
              color: 'white',
              textAlign: 'center',
            }}
          >
            Add House
          </ButtonReuse>
        </Container>
        {isSuccess && data?.length > 0 && (
          <Table striped responsive="md" style={{ textAlign: 'center' }}>
            <thead style={{ backgroundColor: 'white' }}>
              <tr>
                <th style={{ width: '5%' }}>No</th>
                <th style={{ width: '10%' }}>Image</th>
                <th style={{ width: '30%' }}>House Name</th>
                <th style={{ width: '20%' }}>Price</th>
                <th style={{ width: '10%' }} colSpan="2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 1 && 'white',
                  }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <img
                      width="50px"
                      height="50px"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>Rp.{formatNumberToIDR(item.price)}</td>
                  <td>
                    <i
                      className="fa fa-eye"
                      style={{ color: '#5A57AB', cursor: 'pointer' }}
                      onClick={() =>
                        router.push(`/owner/my-house/detail/${item.id}`)
                      }
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash-o"
                      style={{ color: '#5A57AB', cursor: 'pointer' }}
                      onClick={() => handleDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {isLoading && <Loader />}
        {isError && <h2>There was an error processing your request....</h2>}
        {isSuccess && data?.length === 0 && (
          <span className="d-flex flex-column align-items-center">
            <img src={noHomes} alt="no data house" />
            <h2>No Data Your House</h2>
          </span>
        )}
        {isSuccess && data?.length > 0 && (
          <Container fluid>
            <div></div>
            <ButtonReuse
              onClick={previousPage}
              style={{
                backgroundColor: '#5A57AB',
                borderColor: '#5A57AB',
                color: 'white',
                textAlign: 'center',
              }}
              disabled={page === 1 ? true : false}
            >
              Previous
            </ButtonReuse>
            <span className="px-2">{page}</span>
            <ButtonReuse
              onClick={nextPage}
              style={{
                backgroundColor: '#5A57AB',
                borderColor: '#5A57AB',
                color: 'white',
                textAlign: 'center',
              }}
              disabled={
                data?.length <= 4 || (countData > 0 && 5 * page === countData)
                  ? true
                  : false
              }
            >
              Next
            </ButtonReuse>
          </Container>
        )}

        {/* dialog delete */}
        {show && (
          <Modal show={show} backdrop="static" keyboard={false} centered>
            <Modal.Body>Are you sure deleted this data ?</Modal.Body>
            <Modal.Footer>
              <ButtonReuse variant="danger" onClick={() => setShow(false)}>
                CANCEL
              </ButtonReuse>
              <ButtonReuse variant="primary" onClick={handleClickedOk}>
                OK
              </ButtonReuse>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </Container>
  );
};

export default MyHouse;
