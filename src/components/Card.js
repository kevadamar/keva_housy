import Styles from '../css/Card.module.css';
import imgCard1 from '../assets/images/Screen Shot 2019-10-10 at 11.42 1.png';

const Card = ({ item }) => {
  return (
    <div className={Styles.card}>
      <p className={Styles.amenities}>{item.amenities}</p>
      <img
        style={{ width: '100%' }}
        className={Styles.pb10}
        src={imgCard1}
        alt="card1"
      ></img>
      <p className={`${Styles.price} ${Styles.pb10}`}>
        {item.price} / {item.duration}
      </p>
      <p className={`${Styles.detail} ${Styles.pb10}`}>
        {item.detailProperyRoom
          .map((detail) => `${detail.qty} ${detail.name}`)
          .join(', ')}
      </p>
      <p style={{ fontSize: '9px', color: 'grey' }}>{item.address}</p>
    </div>
  );
};

export default Card;
