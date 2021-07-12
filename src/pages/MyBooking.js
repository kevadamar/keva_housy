import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';

import CustomCardBox from '../components/CustomCardBox';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { API } from '../config';
import Loader from '../components/utils/Loader';

const MyBooking = () => {
  const { dispatch: dispatchSearch } = useContext(SearchContext);

  const loadData = async () => {
    try {
      const response = await API.get('bookings');

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    dispatchSearch({ type: HIDE });
    return () => {
      dispatchSearch({ type: SHOW });
    };
  }, []);

  const { isLoading, isError, data, isSuccess } = useQuery('booking', loadData);

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
              <CustomCardBox book={book} type="booking" pushTo="/history" />
            </span>
          );
        })}
      {isSuccess && data.length === 0 && (
        <h2 style={{ textAlign: 'center' }}>
          Oppsss.. Coba booking terlebih dahulu
        </h2>
      )}
    </Container>
  );
};

export default MyBooking;
