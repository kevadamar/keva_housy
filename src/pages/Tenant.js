import React, { useContext, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';

import CardList from '../components/CardList';
import Sidebar from '../components/Sidebar';
import Loader from '../components/utils/Loader';
import { API } from '../config';
import { SearchContext } from '../contexts/SearchContext';

const Tenant = () => {
  const { state: stateSearch } = useContext(SearchContext);
  const { searchText } = stateSearch.searchFilter;
  const [dataFilter, setDataFilter] = useState({
    typeRent: '',
    date: new Date(),
    amenities: '',
    bedroom: '',
    bathroom: '',
    price: '',
    city: '',
    filter: false,
  });

  const fetchData = async (dataFilter, searchText) => {
    let url = 'houses';
    const { typeRent, price, bedroom, bathroom, amenities } = dataFilter;

    if (typeRent) {
      url = `${url}${url.includes('?') ? '&' : '?'}typeRent=${typeRent}`;
    }

    if (price) {
      url = `${url}${url.includes('?') ? '&' : '?'}price=${price}`;
    }

    if (bedroom) {
      url = `${url}${url.includes('?') ? '&' : '?'}bedroom=${bedroom}`;
    }

    if (bathroom) {
      url = `${url}${url.includes('?') ? '&' : '?'}bathroom=${bathroom}`;
    }

    if (amenities) {
      url = `${url}${url.includes('?') ? '&' : '?'}amenities=${amenities}`;
    }

    if (searchText) {
      url = `${url}${url.includes('?') ? '&' : '?'}city=${searchText}`;
    }

    const response = await API.get(url);

    if (response.status !== 200) {
      throw new Error('An error has occured');
    }
    return response.data.data;
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    [
      'houses',
      `typeRent${dataFilter.typeRent}`,
      `price${dataFilter.price}`,
      `bedroom${dataFilter.bedroom}`,
      `bathroom${dataFilter.bathroom}`,
      `amenities${dataFilter.amenities}`,
      `city${searchText}`,
    ],
    () => fetchData(dataFilter, searchText),
    { staleTime: 30000 },
  );

  const handleFilter = (payload) => {
    setDataFilter((currentState) => ({
      ...currentState,
      ...payload,
      filter: true,
    }));
  };

  return (
    <>
      <Row>
        <Col md={3} sm={12}>
          <Sidebar handleFilter={handleFilter} />
        </Col>
        <Col
          md={9}
          sm={12}
          style={{
            backgroundColor: 'rgba(196, 196, 196, 0.25)',
            padding: '20px 25px 0 20px',
          }}
        >
          {isLoading && <Loader />}
          {isError && <h2>There was an error processing your request....</h2>}
          {isSuccess && <CardList data={data} />}
        </Col>
      </Row>
    </>
  );
};

export default Tenant;
