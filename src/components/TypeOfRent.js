import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Styles from '../css/TypeOfRent.module.css';
import ButtonReuse from './utils/ButtonReuse';

const TypeOfRent = ({ handleTypeOfRent }) => {
  const [isSelected, setIsSelected] = useState('day');

  const handleClicked = (e) => {
    const { name } = e.target;
    console.log(name)
    handleTypeOfRent(name);
    setIsSelected(name);
  };

  return (
    <Container
      className="d-flex justify-content-between"
      fluid
      style={{ paddingLeft: '0' }}
    >
      <ButtonReuse
        className={`${isSelected === 'day' && Styles.active} ${Styles.button}`}
        variant="secondary"
        onClick={handleClicked}
        name="day"
      >
        Day
      </ButtonReuse>
      <ButtonReuse
        className={`${isSelected === 'month' && Styles.active} ${Styles.button}`}
        variant="secondary"
        onClick={handleClicked}
        name="month"
      >
        Month
      </ButtonReuse>
      <ButtonReuse
        className={`${isSelected === 'year' && Styles.active} ${Styles.button}`}
        variant="secondary"
        onClick={handleClicked}
        name="year"
      >
        Year
      </ButtonReuse>
      {/* <button
          className={`${Styles.button} ${
            isSelected === 'day' && Styles.active
          }`}
          onClick={handleClicked}
          name="day"
        >
          Day
        </button>
        <button
          className={`${Styles.button} ${
            isSelected === 'month' && Styles.active
          }`}
          onClick={handleClicked}
          name="month"
        >
          Month
        </button>
        <button
          className={`${Styles.button} ${
            isSelected === 'year' && Styles.active
          }`}
          onClick={handleClicked}
          name="year"
        >
          Year
        </button> */}
    </Container>
  );
};
export default TypeOfRent;
