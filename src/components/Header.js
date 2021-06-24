import { useState } from 'react';
import { Form, FormControl, Button, InputGroup, Navbar } from 'react-bootstrap';

import { Link, useHistory } from 'react-router-dom';

import brandLogo from '../assets/images/brand.svg';
import userIconSvg from '../assets/images/user-icon.svg';

import Styles from '../css/Navbar.module.css';
import { items as data } from '../data';

const Header = () => {
  const [login, setLogin] = useState(false);

  // routing using hooks useHistory()
  const router = useHistory();

  // state search box
  const [search, setSearch] = useState('');

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = data.find((item) => item.address === search);

    if (product) {
      return router.push(`/product/${product.id}`);
    }
  };

  const BtnNotLogin = () => {
    return (
      <>
        <Button
          className={`${Styles.fontBold} mr-3 my-2`}
          style={{ color: 'darkgrey' }}
          onClick={() => setLogin((currentState) => !currentState)}
          variant="light-secondary"
        >
          Sign in
        </Button>
        <Button
          className={`${Styles.signUpBtn} ${Styles.fontBold} my-2`}
          onClick={() => setLogin((currentState) => !currentState)}
          variant="light-secondary"
        >
          Sign up
        </Button>
      </>
    );
  };

  return (
    <Navbar expand="lg">
      <Link to="/" className="navbar-brand">
        <img src={brandLogo} alt="brand" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="d-flex m-auto">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Tangerang Selatan"
              className={`${Styles.searchInput} mr-auto`}
              aria-describedby="search-button"
              name="search"
              value={search}
              onChange={handleSearch}
            />
            <span className="bg-identity" style={{ fontSize: '23px' }}>
              |
            </span>
            <InputGroup.Append className={Styles.inputGroupAppend}>
              <Button
                id="search-button"
                onClick={handleSubmit}
                className={Styles.srcButton}
              >
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        {login ? (
          <img
            src={userIconSvg}
            alt="username"
            height="50px"
            onClick={() => setLogin((currentState) => !currentState)}
          />
        ) : (
          <BtnNotLogin />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
