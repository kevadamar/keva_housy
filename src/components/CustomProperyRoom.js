import { useState } from 'react';
import Styles from '../css/CustomPropertyRoom.module.css';

const CustomPropertyRoom = ({ title }) => {
  const [isSelected, setIsSelected] = useState(1);

  const inpArr = [1, 2, 3, 4, 5];

  return (
    <>
      <p style={{ margin: '10px 0', color: '#929292' }}>{title}</p>
      {inpArr.map((value, index) => {
        return (
          <button
            key={index}
            className={`${Styles.button} ${
              isSelected === value && Styles.active
            }`}
            onClick={(e) => setIsSelected(value)}
          >
            {value}{inpArr.length === value && '+'}
          </button>
        );
      })}
    </>
  );
};

export default CustomPropertyRoom;
