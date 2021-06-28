import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { getDataLocalStorage } from '../helper';

import CustomCardBox from '../components/CustomCardBox';
import { BookingContext } from '../contexts/BookingContext';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';

const MyBooking = () => {
  const { dispatch } = useContext(BookingContext);
  const {dispatch:dispatchSearch} = useContext(SearchContext)
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    const fromLocal = getDataLocalStorage({ key: 'booking' });
    setPayload(fromLocal);
    dispatch({ type: 'ADD', payload: fromLocal });
    dispatchSearch({ type: HIDE });
    return () => {
      setPayload(null);
      dispatchSearch({ type: SHOW });
    };
  }, []);

  return (
    <Container fluid className="bg-identity p-5" style={{height: payload === null && '87vh'}}>
      {payload &&
        payload.map((book, idx) => {
          return <CustomCardBox key={idx} book={book} type='booking' pushTo="/history" />;
        })}
      {payload === null && <h2 style={{textAlign:'center'}}>Oppsss.. Coba booking terlebih dahulu</h2>}
    </Container>
  );
};

export default MyBooking;
