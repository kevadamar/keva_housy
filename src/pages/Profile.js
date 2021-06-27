import { useContext, useEffect } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';

import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';

import imgProfile from '../assets/images/img-profile.png';
import Biodata from '../components/Biodata';
import ButtonReuse from '../components/utils/ButtonReuse';

const Profile = () => {
  const { dispatch: dispatchSearch } = useContext(SearchContext);
  const { state: stateUser } = useContext(UserContext);
  const { user } = stateUser;

  useEffect(() => {
    dispatchSearch({ type: HIDE });
    return () => {
        dispatchSearch({ type: SHOW });
    }
  }, []);

  return (
    <Container fluid className="bg-identity p-5" style={{ height: '87vh' }}>
      <Container className="bg-white p-3" style={{ maxWidth: '800px' }}>
        {user && (
          <Row noGutters>
            <Col md={9}>
              <Biodata user={user} />
            </Col>
            <Col md={3}>
              <Image src={imgProfile} fluid />
              <ButtonReuse className="mt-5" style={{ backgroundColor: '#5A57AB', color: ' white' }} block>
                Change Photo Profile
              </ButtonReuse>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Profile;
