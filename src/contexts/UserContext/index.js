import { createContext, useReducer } from 'react';
import {
  ADD_NEW_USER,
  HIDE_ALERT,
  HIDE_SIGN_IN,
  LOGIN,
  LOGOUT,
  SHOW_SIGN_IN,
} from './action';

export const UserContext = createContext();

const initialState = {
  showModalLogin: false,
  isLogin: false,
  isSignUp: false,
  user: {
    fullname: '',
    username: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',
    address: '',
    gender: '',
  },
  tempUser: [
    {
      fullname: 'user biasa',
      username: 'user',
      email: 'user@gmail.com',
      password: 'user',
      role: 'tenant',
      phoneNumber: '081265589',
      address: 'JL.H.JAsirin 20',
      gender: 'L',
    },
    {
      fullname: 'Owner Sakti',
      username: 'owner',
      email: 'owner@gmail.com',
      password: 'owner',
      role: 'owner',
      phoneNumber: '081265589',
      address: 'JL. Gatot Subroto 20',
      gender: 'P',
    },
  ],
};

const handleSignUp = ({ currentState, payload }) => {
  let newUser = [];
  let found = false;
  const checkUser = currentState.tempUser.find(
    (state) => state.email === payload.email,
  );
  if (checkUser) {
    newUser = currentState.tempUser;
    found = true;
    console.log('exist');
  } else {
    newUser = currentState.tempUser;
    newUser = newUser.concat(payload);
    found = false;
    console.log('new');
  }
  console.log(newUser);
  return {
    ...currentState,
    tempUser: newUser,
    isLogin: false,
    isSignUp: found,
  };
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      return {
        ...state,
        user: payload,
        isLogin: true,
        isSignUp: false,
      };

    case LOGOUT:
      return {
        ...state,
        user: {
          fullname: '',
          name: '',
          email: '',
          password: '',
        },
        isLogin: false,
        isSignUp: false,
      };
    case ADD_NEW_USER:
      console.log(handleSignUp({ currentState: state, payload }));
      return handleSignUp({ currentState: state, payload });
    case HIDE_ALERT:
      return {
        ...state,
        isSignUp: false,
      };
    case SHOW_SIGN_IN:
      return {
        ...state,
        showModalLogin: true,
      };
    case HIDE_SIGN_IN:
      return {
        ...state,
        showModalLogin: false,
      };
    default:
      throw new Error('case unknown');
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
