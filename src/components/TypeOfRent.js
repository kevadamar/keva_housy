import { useState } from 'react';
import Styles from '../css/TypeOfRent.module.css';

const TypeOfRent = () => {
  const [isSelected, setIsSelected] = useState('day');

  const handleClicked = (e) => {
    setIsSelected(e.target.name);
  };

  return (
    <>
      <div>
        <button
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
        </button>
      </div>
    </>
  );
};
export default TypeOfRent;
