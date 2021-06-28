import { createContext, useReducer } from 'react';

export const BookingContext = createContext();

const initialState = {
  booking: null,
};

const bookingReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'ADD':
      return {
        ...state,
        booking: payload,
      };
    case 'REMOVE':
      return {
        ...state,
        booking: null,
      };
    default:
      throw new Error('case unknown');
  }
};

export const BookingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
};
