import { useState } from 'react';
import Styles from '../css/Aminities.module.css';

const Aminities = ({ stateAminities, handleAminities }) => {
  const [isChecked, setIsChecked] = useState({
    furnished: false,
    petAllowed: false,
    sharedAccomodation: false,
  });

  const handleChecked = (e, id) => {
    handleAminities({ id, status: !isChecked[e.target.name] });
    setIsChecked((currentState) => ({
      ...currentState,
      [e.target.name]: !currentState[e.target.name],
    }));
  };

  const keyp = ['furnished', 'petAllowed', 'sharedAccomodation'];

  return (
    <div>
      {stateAminities &&
        stateAminities.map((item, index) => {
          return (
            <span key={index} className={Styles.grid}>
              <label>{item.name}</label>
              <div className={Styles.checkboxContainer}>
                <input
                  className={Styles.inputCheckbox}
                  type="checkbox"
                  onChange={(e) => handleChecked(e, item.id)}
                  name={keyp[index]}
                  checked={item.status}
                />
              </div>
            </span>
          );
        })}
    </div>
  );
};

export default Aminities;
