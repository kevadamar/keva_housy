import { useState } from 'react';
import Styles from './Aminities.module.css';

const Amenities = ({ stateAmenities, handleAmenities }) => {
  const [isChecked, setIsChecked] = useState({
    furnished: false,
    petAllowed: false,
    sharedAccomodation: false,
  });

  const [data, setData] = useState([]);

  const handleChecked = (e, name) => {
    let newData;
    if (data.includes(name)) {
      newData = data.length === 0 ? data : data.filter((v) => v !== name);
      setData(newData);
    } else {
      newData = data;
      newData.push(name);
      setData(newData);
    }

    handleAmenities(newData);
    setIsChecked((currentState) => ({
      ...currentState,
      [e.target.name]: !currentState[e.target.name],
    }));
  };

  const keyp = ['furnished', 'petAllowed', 'sharedAccomodation'];

  return (
    <div>
      {stateAmenities &&
        stateAmenities.map((item, index) => {
          return (
            <span key={index} className={Styles.grid}>
              <label>{item.name}</label>
              <div className={Styles.checkboxContainer}>
                <input
                  className={Styles.inputCheckbox}
                  type="checkbox"
                  onChange={(e) => handleChecked(e, item.name)}
                  name={keyp[index]}
                  checked={isChecked[keyp[index]]}
                />
              </div>
            </span>
          );
        })}
    </div>
  );
};

export default Amenities;
