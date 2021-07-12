import { useContext, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import Tenant from './Tenant';

const Home = () => {
  const router = useHistory();
  const { location } = router;

  const { state: stateUser } = useContext(UserContext);

  useEffect(() => {
    if (location.state && stateUser.isLogin) {
      router.replace(location.state.pathname);
    }
  }, []);

  return (
    <Container fluid>
      {stateUser.user?.role === 'owner' ? <Redirect to="/owner" /> : <Tenant />}
    </Container>
  );
};

export default Home;
