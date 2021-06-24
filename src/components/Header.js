import { useState } from 'react';
import { Form, FormControl, Button, InputGroup, Navbar } from 'react-bootstrap';

import { Link, useHistory } from 'react-router-dom';

import brandLogo from '../assets/images/brand.svg';
import userIconSvg from '../assets/images/user-icon.svg';

import Styles from '../css/Navbar.module.css';
import { items as data } from '../data';
import ModalSignin from './ModalSignin';
import ModalSignup from './ModalSignup';

const Header = () => {
  const [login, setLogin] = useState(false);

  // routing using hooks useHistory()
  const router = useHistory();

  // state search box
  const [getSearch, setSearch] = useState('');

  // state handle form login
  const [formLogin, setFormLogin] = useState({
    username: '',
    password: '',
  });

  // state handle form sign up
  const [formSignup, setFormSignup] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
  });

  //state handle modal box
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    nameSignIn: 'signIn',
    nameSignUp: 'signUp',
  });

  // handle submit login
  const handleSubmitSignin = (payload) => {
    setFormLogin((currentState) => ({ ...currentState, payload }));
    setLogin((currentState) => !currentState);
  };

  // handle submit login
  const handleSubmitSignup = (payload) => {
    setFormSignup((currentState) => ({ ...currentState, payload }));
    setLogin((currentState) => !currentState);
  };

  // handle search
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleModalTitle = ({ title, name }) => {
    setShow((currentState) => ({ ...currentState, [name]: true }));
    // setTitle(title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = data.find((item) => item.address === getSearch);

    if (product) {
      return router.push(`/product/${product.id}`);
    }
  };

  const handleLogout = () => {
    setShow({
      signIn: false,
      signUp: false,
      nameSignIn: 'signIn',
      nameSignUp: 'signUp',
    });
    setLogin((currentState) => !currentState);
  };

  const BtnNotLogin = () => {
    return (
      <>
        <ModalSignin
          show={show.signIn}
          handleClose={() =>
            setShow((currentState) => ({
              ...currentState,
              [show.nameSignIn]: false,
            }))
          }
          handleSubmitLogin={handleSubmitSignin}
        />
        <Button
          className={`${Styles.fontBold} mr-3 my-2`}
          style={{ color: 'darkgrey' }}
          onClick={() =>
            handleModalTitle({ title: 'Sign In', name: show.nameSignIn })
          }
          variant="light-secondary"
        >
          Sign in
        </Button>
        <ModalSignup
          show={show.signUp}
          handleClose={() =>
            setShow((currentState) => ({
              ...currentState,
              [show.nameSignUp]: false,
            }))
          }
          handleSubmitSignup={handleSubmitSignup}
        />
        <Button
          className={`${Styles.signUpBtn} ${Styles.fontBold} my-2`}
          onClick={() => handleModalTitle({ title: 'Sign Up', name: 'signUp' })}
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
              value={getSearch}
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
            className={Styles.img}
            src={userIconSvg}
            alt="username"
            height="50px"
            onClick={handleLogout}
          />
        ) : (
          <BtnNotLogin />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
