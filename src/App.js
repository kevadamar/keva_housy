import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import { UserContextProvider } from './contexts/UserContext';
import DetailProduct from './pages/DetailProduct';
import { SearchContextProvider } from './contexts/SearchContext';
import Profile from './pages/Profile';
import PrivateRoute from './components/utils/PrivateRoute';

function App() {
  return (
    <Router>
      <UserContextProvider>
        <SearchContextProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <Route exact path="/product/:id" component={DetailProduct} /> 
          </Switch>
        </SearchContextProvider>
      </UserContextProvider>
    </Router>
  );
}

export default App;
