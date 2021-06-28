import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { UserContextProvider } from './contexts/UserContext';
import DetailProduct from './pages/DetailProduct';
import { SearchContextProvider } from './contexts/SearchContext';
import Profile from './pages/Profile';
import PrivateRoute from './components/utils/PrivateRoute';
import MyBooking from './pages/MyBooking';
import { BookingContextProvider } from './contexts/BookingContext';
import MyHistory from './pages/MyHistory';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <SearchContextProvider>
          <BookingContextProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/booking" component={MyBooking} />
              <PrivateRoute exact path="/history" component={MyHistory} />
              <Route exact path="/product/:id" component={DetailProduct} />
            </Switch>
          </BookingContextProvider>
        </SearchContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
