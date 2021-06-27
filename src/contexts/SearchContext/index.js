import { createContext, useReducer } from 'react';

import { HIDE, SEARCH_FILTER, SHOW } from './action';

export const SearchContext = createContext();

const initialState = {
  show: true,
  searchFilter: {
    isFilter: false,
    searchText:''
  },
};


const searchReducer = (state, action) => {
  const { type, searchText } = action;

  switch (type) {
    case SHOW:
      return {
        ...state,
        show: true,
      };

    case HIDE:
      return {
        ...state,
        show: false,
      };
    case SEARCH_FILTER:
      const isFilter = (searchText.length > 0 ? true : false)
      return {
        ...state,
        searchFilter: {...state.searchFilter, isFilter,searchText}
      }
    default:
      throw new Error('case unknown');
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
