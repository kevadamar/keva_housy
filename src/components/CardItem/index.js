import { useHistory } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

import Styles from './Card.module.css';
import { formatNumberToIDR } from '../../helper';

function CardItem({ item }) {
  const router = useHistory();

  const handlePushToDetail = (id) => {
    router.push(`/product/${id}`);
  };
  return (
    <Card className={Styles.card} onClick={() => handlePushToDetail(item.id)}>
      <span className={Styles.amenitiesContainer}>
        {item.amenities &&
          item.amenities.map((amenities, index) => (
            <Badge key={index} variant="light" className="mt-2 p-2">
              {amenities}
            </Badge>
          ))}
      </span>
      <Card.Img
        variant="top"
        src={item.image}
        height={200}
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className={Styles.cardBody}>
        <Card.Title className="my-2">
          Rp.{formatNumberToIDR(item.price)} / {item.typeRent}
        </Card.Title>
        <Card.Text className={Styles.cardTextContent}>
          {item.bedroom} Beds, {item.bathroom} Baths, {item.area} Sqft
        </Card.Text>
        <Card.Text className={Styles.cardTextContent}>
          <span className={Styles.cardTitle}>
            {item.address}, {item.city.name}
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
