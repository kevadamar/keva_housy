import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from './contexts/UserContext';
import { SearchContextProvider } from './contexts/SearchContext';
import { BookingContextProvider } from './contexts/BookingContext';
import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserContextProvider>
        <SearchContextProvider>
          <BookingContextProvider>
            <App />
          </BookingContextProvider>
        </SearchContextProvider>
      </UserContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
