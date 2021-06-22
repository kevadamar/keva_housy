import { useState } from 'react';
import Styles from '../css/Aminities.module.css';

const Aminities = () => {
  const [isChecked, setIsChecked] = useState({
    furnished: true,
    petAllowed: false,
    sharedAccomodation: false,
  });

  const handleChecked = (e) => {
    setIsChecked({ ...isChecked, [e.target.name]: e.target.checked });
  };

  return (
    <div className={Styles.grid}>
      <label>Furnished</label>
      <div className={Styles.checkboxContainer}>
        <input
          className={Styles.inputCheckbox}
          type="checkbox"
          onChange={handleChecked}
          name="furnished"
          checked={isChecked.furnished}
        />
      </div>
      <label>Pet Allowed</label>
      <div className={Styles.checkboxContainer}>
        <input
          className={Styles.inputCheckbox}
          type="checkbox"
          onChange={handleChecked}
          name="petAllowed"
        />
      </div>
      <label>Shared Accomodation</label>
      <div className={Styles.checkboxContainer}>
        <input
          className={Styles.inputCheckbox}
          type="checkbox"
          onChange={handleChecked}
          name="sharedAccomodation"
        />
      </div>
    </div>
  );
};

export default Aminities;
