import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Form, FormControl, Button, InputGroup, Navbar } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import brandLogo from '../../assets/images/brand.svg';
import userIconSvg from '../../assets/images/user-icon.svg';
import { SearchContext } from '../../contexts/SearchContext';
import { SEARCH_FILTER } from '../../contexts/SearchContext/action';
import { UserContext } from '../../contexts/UserContext';
import {
  ADD_NEW_USER,
  HIDE_SIGN_IN,
  LOGIN,
  LOGOUT,
} from '../../contexts/UserContext/action';

import Styles from './Navbar.module.css';
import {
  getDataLocalStorage,
  removeDataLocalStorage,
  saveToLocalStorage,
} from '../../helper';
import CustomDropdown from '../CustomDropdown';
import ModalSignin from '../ModalSignin';
import ModalSignup from '../ModalSignup';
import ButtonReuse from '../utils/ButtonReuse';

const Header = () => {
  // contexts
  const { state: stateSearch, dispatch: dispatchSearch } =
    useContext(SearchContext);
  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);
  const { show: showSearch } = stateSearch;

  // state show dropdown user
  const [userDropdownShow, setUserDropdownShow] = useState(false);

  // state search box
  const [getSearch, setSearch] = useState('');

  //state handle modal box
  const [show, setShow] = useState({
    signIn: false,
    signUp: false,
    nameSignIn: 'signIn',
    nameSignUp: 'signUp',
  });

  // handle submit login
  const handleSubmitSignin = (payload) => {
    dispatchUser({ type: LOGIN, payload });
    saveToLocalStorage({ key: 'user', payload });
  };

  // handle submit signup
  const handleSubmitSignup = (payload) => {
    dispatchUser({ type: ADD_NEW_USER, payload });
    // handleModalShow({ name: show.nameSignIn });
    if (!stateUser.isSignUp) {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    }
  };
  
  const handleModalTo = ({ name }) => {
    if (name === 'signIn') {
      setShow((currentState) => ({
        ...currentState,
        signIn: true,
        signUp: false,
      }));
    } else {
      setShow((currentState) => ({
        ...currentState,
        signIn: false,
        signUp: true,
      }));
    }
  };

  // handle search
  const handleSearch = (e) => {
    const { value } = e.target;
    dispatchSearch({ type: SEARCH_FILTER, searchText: value });
    setSearch(value);
  };

  const handleModalShow = ({ name }) => {
    setShow((currentState) => ({
      ...currentState,
      [name]: !currentState[name],
    }));
  };


  const handleSubmit = () => {
    dispatchSearch({ type: SEARCH_FILTER, searchText: getSearch });
  };

  const handleLogout = () => {
    setShow({
      signIn: false,
      signUp: false,
      nameSignIn: 'signIn',
      nameSignUp: 'signUp',
    });
    setUserDropdownShow(false);
    removeDataLocalStorage({ key: 'user' });
    dispatchUser({ type: LOGOUT });
  };

  // render 1x
  useEffect(() => {
    const auth = getDataLocalStorage({ key: 'user' });
    if (auth) {
      dispatchUser({ type: LOGIN, payload: auth });
    } else {
      dispatchUser({ type: LOGOUT });
    }
  }, []);

  const BtnNotLogin = () => {
    return (
      <>
        <ModalSignin
          show={show.signIn}
          handleClose={() => handleModalShow({ name: show.nameSignIn })}
          handleTo={() => handleModalTo({ name: show.nameSignUp })}
          handleSubmitLogin={handleSubmitSignin}
        />
        <ButtonReuse
          className={`${Styles.fontBold} mr-3 my-2`}
          style={{ color: 'darkgrey' }}
          onClick={() => handleModalShow({ name: show.nameSignIn })}
          variant="light-secondary"
        >
          Sign in
        </ButtonReuse>
        <ModalSignup
          show={show.signUp}
          handleClose={() => handleModalShow({ name: show.nameSignUp })}
          handleTo={() => handleModalTo({ name: show.nameSignIn })}
          handleSubmitSignup={handleSubmitSignup}
        />
        <ButtonReuse
          className={`${Styles.signUpBtn} ${Styles.fontBold} my-2`}
          onClick={() => handleModalShow({ name: show.nameSignUp })}
          variant="light-secondary"
        >
          Sign up
        </ButtonReuse>
      </>
    );
  };

  return (
    <Navbar expand="md" onClick={() => setUserDropdownShow(false)}>
      <Link to="/" className="navbar-brand">
        <img src={brandLogo} alt="brand" />
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        
        <Form className="d-flex m-auto">
          {showSearch && (
            <InputGroup className={Styles.inputGroup}>
              <FormControl
                type="text"
                placeholder="Tangerang Selatan"
                className={`${Styles.searchInput} mr-auto`}
                aria-describedby="search-button"
                name="search"
                value={getSearch}
                onChange={handleSearch}
              />
              <span className={`${Styles.separator} bg-identity`}>|</span>
              <InputGroup.Append className={Styles.inputGroupAppend}>
                <Button
                  id="search-button"
                  onClick={handleSubmit}
                  className={`${Styles.srcButton}`}
                >
                  <i className="fa fa-search"></i>
                </Button>
              </InputGroup.Append>
            </InputGroup>
          )}
        </Form>
        
        {stateUser.isLogin ? (
          <>
            <img
              className={Styles.img}
              src={userIconSvg}
              alt="username"
              height="50px"
              onMouseOver={() =>
                setUserDropdownShow((currentState) => !currentState)
              }
            />

            {userDropdownShow && <CustomDropdown handleLogout={handleLogout} />}
          </>
        ) : (
          <BtnNotLogin />
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
