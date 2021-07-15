import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import DetailProduct from './pages/DetailProduct';
import Profile from './pages/Profile';
import PrivateRoute from './components/utils/PrivateRoute';
import MyBooking from './pages/MyBooking';
import MyHistory from './pages/MyHistory';
import Owner from './pages/Owner';
import AddProperty from './components/AddProperty';
import { getDataLocalStorage } from './helper';
import { setAuthToken } from './config';
import MyHouse from './pages/Myhouse';
import DetailProperty from './components/DetailProperty';

if (getDataLocalStorage({ key: 'token' })) {
  setAuthToken(getDataLocalStorage({ key: 'token' }));
}
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/booking" component={MyBooking} />
        <PrivateRoute exact path="/history" component={MyHistory} />

        {/* route owner */}
        <PrivateRoute exact path="/owner" component={Owner} />
        <PrivateRoute exact path="/owner/history" component={MyHistory} />

        {/* route owner house */}
        <PrivateRoute exact path="/owner/my-house" component={MyHouse} />
        <PrivateRoute exact path="/owner/add" component={AddProperty} />
        <PrivateRoute exact path="/owner/my-house/detail/:id" component={DetailProperty} />
      </Switch>
    </Router>
  );
}

export default App;
