import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';

import CustomCardBox from '../components/CustomCardBox';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { SearchContext } from '../contexts/SearchContext';
import { API } from '../config';
import Loader from '../components/utils/Loader';
import { UserContext } from '../contexts/UserContext';

const MyHistory = () => {
  const { dispatch: dispatchSearch } = useContext(SearchContext);
  const { state:stateUser } = useContext(UserContext);

  useEffect(() => {
    dispatchSearch({ type: HIDE });
    return () => {
      dispatchSearch({ type: SHOW });
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
        <h2 style={{ textAlign: 'center' }}>
          {stateUser.user.role === 'tenant' ? 'Oppsss.. Coba menginap terlebih dahulu' : 'No Data History...'}
        </h2>
      )}
    </Container>
  );
};

export default MyHistory;
