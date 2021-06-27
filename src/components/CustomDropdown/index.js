import { useHistory } from 'react-router';

import userIcon from '../../assets/images/user-icon-2.svg';
import calendarIcon from '../../assets/images/calendar-icon.png';
import billIcon from '../../assets/images/bill-icon.png';
import logoutIcon from '../../assets/images/logout-icon.png';
import propertyIcon from '../../assets/images/add-property-icon.png';

import Styles from './CustomDropdown.module.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const CustomDropdown = ({ handleLogout }) => {
    const {state:stateUser} = useContext(UserContext)
  const router = useHistory();

  const handleLogoutClick = () => {
    router.push('/');
    handleLogout();
  };

  const DropdownUser = () => {
    return (
      <>
        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            // router.push('/profile');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={userIcon}
            alt="user icon"
            width="40px"
          />
          <p className={Styles.textMenu}>Profile</p>
        </div>

        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            // router.push('/booking');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={calendarIcon}
            alt="calendar icon"
            width="40px"
          />
          <p className={Styles.textMenu}>My booking</p>
        </div>

        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            // router.push('/history');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={billIcon}
            alt="bill icon"
            width="40px"
          />
          <p className={Styles.textMenu}>History</p>
        </div>
      </>
    );
  };

  const DropdownOwner = () => {
    return (
      <>
        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            // router.push('/profile');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={userIcon}
            alt="user icon"
            width="40px"
          />
          <p className={Styles.textMenu}>Profile</p>
        </div>

        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            // router.push('/owner/add');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={propertyIcon}
            alt="calendar icon"
            width="40px"
          />
          <p className={Styles.textMenu}>Add Property</p>
        </div>

        <div
          className={Styles.dropdownMenu}
          onClick={() => {
            // router.push('/owner/history');
          }}
        >
          <img
            className={Styles.menuIcon}
            src={billIcon}
            alt="bill icon"
            width="40px"
          />
          <p className={Styles.textMenu}>History</p>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={Styles.dropdown}>
        <span className={Styles.caretDown}></span>
        <span className={Styles.caretDown2}></span>

       {stateUser.user.role === 'tenant' ? <DropdownUser/> : <DropdownOwner/>}

        <p className={Styles.divider}></p>
        <div className={Styles.dropdownMenu} onClick={handleLogoutClick}>
          <img
            className={Styles.menuIcon}
            src={logoutIcon}
            alt="logout icon"
            width="40px"
          />
          <p className={Styles.textMenu}>Logout</p>
        </div>
      </div>
    </>
  );
};

export default CustomDropdown;
