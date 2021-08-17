import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { SearchContextProvider } from './contexts/SearchContext';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </UserContextProvider>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
