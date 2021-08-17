import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { io } from 'socket.io-client';

import noTransaction from '../assets/images/no-transaction.webp';

import ModalApproval from '../components/ModalApproval';
import ButtonReuse from '../components/utils/ButtonReuse';
import Loader from '../components/utils/Loader';
import { API } from '../config';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';
import { getDataLocalStorage } from '../helper';

const Owner = () => {
  const socket = useRef();
  const router = useHistory();

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

  const handleClick = (idOrder) => {
    setIdOrder(idOrder);
    setShow(true);
  };

  const handleOnHide = () => {
    setIdOrder('');
    setShow(false);
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

    socket.current.emit('load-notification', user.email);
    // end trigger

    return () => {
      dispatch({ type: SHOW });
      setShow(false);
      setIdOrder('');
      socket.current.disconnect();
      setPage(1);
      setCountData(0);
    };
  }, []);

  const loadData = async (page) => {
    try {
      const response = await API.get(`orders?page=${page}`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      setCountData(response.data.countData);
      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    ['orders', page],
    () => loadData(page),
    { staleTime: page > 1 ? 10000 : 0 },
  );

  return (
    <Container
      fluid
      className="bg-identity"
      style={{ height: '87vh' }}
    >
      <Container className="py-5">
        <h4>Incoming Transaction</h4>
        {isSuccess && data?.length > 0 && (
          <Table striped responsive="md" style={{ textAlign: 'center' }}>
            <thead style={{ backgroundColor: 'white' }}>
              <tr>
                <th style={{ width: '5%' }}>No</th>
                <th style={{ width: '25%' }}>Users</th>
                <th style={{ width: '25%' }}>House</th>
                <th style={{ width: '10%' }}>Type Rent</th>
                <th style={{ width: '13%' }}>Bukti Transfer</th>
                <th style={{ width: '13%' }}>Status Payment</th>
                <th style={{ width: '7%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 1 && 'white',
                    height: '65px',
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.user.fullname}</td>
                  <td>{item.house.name}</td>
                  <td>{item.house.typeRent}</td>
                  <td>
                    <a
                      href={item.attachment}
                      style={{ color: '#5A57AB', textDecoration: 'none' }}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Show Proof
                    </a>
                  </td>
                  <td>
                    {item.status === 0 && (
                      <span style={{ color: 'red' }}>Cancel</span>
                    )}
                    {item.status === 1 && (
                      <span style={{ color: 'rgb(181 62 11)' }}>
                        Waiting Payment
                      </span>
                    )}
                    {item.status === 2 && (
                      <span style={{ color: '#F7941E' }}>Pending</span>
                    )}
                    {item.status === 3 && (
                      <p style={{ color: 'green' }}>Approve</p>
                    )}
                  </td>
                  <td>
                    <i
                      className="fa fa-search"
                      style={{ color: '#5A57AB', cursor: 'pointer' }}
                      onClick={() => handleClick(item.id)}
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
            <img src={noTransaction} alt="no transaction" />
            <h2>No Data Transaction</h2>
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
        {show && (
          <ModalApproval show={show} setshow={handleOnHide} id={idOrder} />
        )}
      </Container>
    </Container>
  );
};

export default Owner;
