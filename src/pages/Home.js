import { useContext, useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import CardList from '../components/CardList';
import Sidebar from '../components/Sidebar';
import { SearchContext } from '../contexts/SearchContext';
import { UserContext } from '../contexts/UserContext';
import { items as data } from '../data';
const Home = () => {
  const router = useHistory();
  const { location } = router;
  const [payloadDummy, setpayloadDummy] = useState(null);
  const [tempPayload, setTempPayload] = useState(null);

  const { state: stateUser } = useContext(UserContext);
  const { state: stateSearch } = useContext(SearchContext);
  const { isFilter, searchText } = stateSearch.searchFilter;

  useEffect(() => {
    setpayloadDummy(data);
    setTempPayload(data);
    console.log('updated', payloadDummy);
    if (isFilter) {
      setpayloadDummy(filterHouseBasedOnSearchInput(tempPayload));
    }
    console.log(location);
    if (location.state && stateUser.isLogin) {
      router.replace(location.state.pathname);
    }
  }, [stateSearch]);

  const filterHouseBasedOnSearchInput = (payload) => {
    const res = payload.filter((house) => {
      return house.address.toLowerCase().includes(searchText.toLowerCase());
    });

    return res;
  };

  const handleFilter = (payload) => {
    setpayloadDummy(payload);
  };

  return (
    <Container fluid>
      {payloadDummy && (
        <Row>
          <Col md={3} sm={12}>
            <Sidebar handleFilter={handleFilter} />
          </Col>
          <Col
            md={9}
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
