import { useContext, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { io } from 'socket.io-client';

import noHistory from '../assets/images/no-history.png';

import CustomCardBox from '../components/CustomCardBox';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { SearchContext } from '../contexts/SearchContext';
import { API } from '../config';
import Loader from '../components/utils/Loader';
import { UserContext } from '../contexts/UserContext';
import { getDataLocalStorage } from '../helper';

const MyHistory = () => {
  const socket = useRef();

  const { dispatch: dispatchSearch } = useContext(SearchContext);
  const { state: stateUser } = useContext(UserContext);

  useEffect(() => {
    dispatchSearch({ type: HIDE });
    if (stateUser.user.role === 'owner') {
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
    }

    return () => {
      dispatchSearch({ type: SHOW });
      if (stateUser.user.role === 'owner') socket.current.disconnect();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await API.get(`orders`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const { isLoading, data, isError, isSuccess } = useQuery('orders', fetchData);

  return (
    <Container
      fluid
      className="bg-identity p-5"
      style={{ height: data && data.length === 0 && '87vh' }}
    >
      {isLoading && <Loader />}
      {isError && <h2>There was an error processing your request....</h2>}
      {isSuccess &&
        data.map((book) => {
          return (
            <span key={book.id}>
              <CustomCardBox book={book} type="history" />
            </span>
          );
        })}
      {isSuccess && data.length === 0 && (
        <span className="d-flex flex-column align-items-center">
          <img src={noHistory} alt="no history" />
          <h2>
            {stateUser.user.role === 'tenant'
              ? 'Oppsss.. Coba menginap terlebih dahulu'
              : 'No Data History...'}
          </h2>
        </span>
      )}
    </Container>
  );
};

export default MyHistory;
