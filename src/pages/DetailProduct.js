import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ImageWrapperDetail from '../components/ImageWrapperDetail';
import ButtonReuse from '../components/utils/ButtonReuse';
import { items as dataDummy } from '../data';
import { SearchContext } from '../contexts/SearchContext';

const DetailProduct = () => {
  const { dispatch } = useContext(SearchContext);
  const { id } = useParams();
  const [data, setData] = useState(null);

  const loadDataById = (id) => {
    return dataDummy.find((dummy) => dummy.id === parseInt(id));
  };

  useEffect(() => {
    dispatch({ type: 'HIDE' });
    setData(loadDataById(id));
    return () => {
      dispatch({ type: 'SHOW' });
    };
  }, []);
  return (
    <Container fluid className="bg-identity">
      {data && (
        <Container className='py-4'>
          <ImageWrapperDetail />
          <h2>Astina</h2>
          <p>{data.address}</p>
          <h3>
            {data.price} / {data.duration}
          </h3>
          <span>
            {data.detailPropertyRoom.map((item, index) => {
              return (
                <>
                  <p key={index}>
                    {item.name} {item.qty}
                  </p>
                </>
              );
            })}
          </span>
          <h3>Description</h3>
          <p>lorem ipsum description</p>
          <ButtonReuse>BOOK NOW</ButtonReuse>
        </Container>
      )}
    </Container>
  );
};

export default DetailProduct;
