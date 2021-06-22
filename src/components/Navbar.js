import { useState } from 'react';
import brandLogo from '../assets/images/brand.svg';
import Styles from '../css/Navbar.module.css';

const Navbar = () => {
  const [getSearch, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header className={Styles.header}>
        <img
          style={{ width: '158px', height: '75px' }}
          src={brandLogo}
          alt="brand"
        />
        <div className={Styles.searchBox}>
          <input
            className={Styles.searchInput}
            type="text"
            name="search"
            value={getSearch}
            onChange={handleSearch}
            placeholder="Tangerang Selatan"
          />
          <span style={{ fontSize: '27px', color: 'grey' }}>|</span>
          <span className={Styles.srcButton}>
            <i className="fa fa-search"></i>
          </span>
        </div>
        <div>
          <button className={`${Styles.button} ${Styles.signInBtn}`}>
            Sign in
          </button>
          <button className={Styles.button}>Sign up</button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
