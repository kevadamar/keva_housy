import { Container } from 'react-bootstrap';
import noHomes from '../../../assets/images/no-homes.png';

const NotFoundFilter = () => {
  return (
    <Container className="d-flex flex-column align-items-center">
      <img src={noHomes} alt="no data house filter" />
      <h2> Oppsss . . . Rumah yang kamu cari tidak ada ;(</h2>
    </Container>
  );
};

export default NotFoundFilter;
