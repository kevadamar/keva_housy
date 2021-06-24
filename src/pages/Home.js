import { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import CardList from '../components/CardList';
import Sidebar from '../components/Sidebar';
import { items as data } from '../data';
const Home = () => {
  const [payloadDummy, setpayloadDummy] = useState(null);

  useEffect(() => {
    setpayloadDummy(data);
    return () => {
      setpayloadDummy(null);
    };
  }, [payloadDummy]);

  return (
    <Container fluid>
      {payloadDummy && (
        <Row>
          <Col md={4} sm={12}>
            <Sidebar />
          </Col>
          <Col
            md={8}
            sm={12}
            style={{
              backgroundColor: 'rgba(196, 196, 196, 0.25)',
              padding: '20px 20px 0px 20px',
            }}
          >
            <CardList data={payloadDummy} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
