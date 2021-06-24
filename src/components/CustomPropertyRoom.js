import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Styles from '../css/CustomPropertyRoom.module.css';

const CustomPropertyRoom = ({ title, name, handlePropertyRoom }) => {
  const [isSelected, setIsSelected] = useState(1);

  const inpArr = [1, 2, 3, 4, 5];
  const handleClick = (value) => {
    handlePropertyRoom({ name, qty: value });
    setIsSelected(value);
  };
  return (
    <>
      <p style={{ margin: '10px 0', color: '#929292' }}>{title}</p>
      <Container
        fluid
        style={{ paddingLeft: '0' }}
        className="d-flex justify-content-between flex-wrap"
      >
        {inpArr.map((value, index) => {
          return (
            <button
              key={index}
              className={`${Styles.button} ${
                isSelected === value && Styles.active
              }`}
              onClick={() => handleClick(value)}
            >
              {value}
              {inpArr.length === value && '+'}
            </button>
          );
        })}
      </Container>
    </>
  );
};

export default CustomPropertyRoom;
