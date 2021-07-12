import { Col, Row } from 'react-bootstrap';
import CardItem from '../CardItem';
import NotFoundFilter from '../utils/NotFoundFilter';

const CardList = ({data}) => {
  return (
    <Row>
      { data.length>0 && data.map((item, index) => (
        <Col xl={4} sm={12} md={6} key={index} style={{ marginBottom: '16px' }}>
          <CardItem item={item} />
        </Col>
      ))}
      {data.length === 0 && <NotFoundFilter/>}
    </Row>
  );
};

export default CardList;
