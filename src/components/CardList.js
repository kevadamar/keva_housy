import { Col, Row } from 'react-bootstrap';
import CardItem from './CardItem';

const CardList = ({data}) => {
  return (
    <Row>
      {data.map((item, index) => (
        <Col xl={4} sm={12} md={6} key={index} style={{ marginBottom: '16px' }}>
          <CardItem item={item} />
        </Col>
      ))}
    </Row>
  );
};

export default CardList;
