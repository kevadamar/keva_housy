// import { useHistory } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';
import imgCard1 from '../assets/images/Screen Shot 2019-10-10 at 11.42 1.png';
import Styles from '../css/Card.module.css';

function CardItem({ item }) {
  // const router = useHistory();

  // const handlePushToDetail = (id) => {
  //   console.log(id);
  //   router.push(`product/${id}`);
  // };
  return (
    <Card className={Styles.card}>
      <span className={Styles.amenitiesContainer}>
        {item.amenities &&
          item.amenities.map(
            (amenities, index) =>
              amenities.status && (
                <Badge key={index} variant="light" className="mt-2 p-2">
                  {amenities.name}
                </Badge>
              )
          )}
      </span>
      <Card.Img
        variant="top"
        src={imgCard1}
        height={200}
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className={Styles.cardBody}>
        <Card.Title className="my-2">
          {item.price} / {item.duration}
        </Card.Title>
        <Card.Text className={Styles.cardTextContent}>
          {item.detailProperyRoom
            .map((detail) => `${detail.qty} ${detail.name}`)
            .join(', ')}
        </Card.Text>
        <Card.Text className={Styles.cardTextContent}>
          <span style={{ fontSize: '9px', color: 'grey' }}>{item.address}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardItem;
