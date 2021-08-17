import { useContext, useEffect, useRef } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { useMutation, useQuery } from 'react-query';
import { io } from 'socket.io-client';

import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';

import imgProfile from '../assets/images/img-profile.png';
import Biodata from '../components/Biodata';
import ButtonReuse from '../components/utils/ButtonReuse';
import { API } from '../config';
import { UPDATE_PHOTO } from '../contexts/UserContext/action';
import { getDataLocalStorage } from '../helper';

const Profile = () => {
  const socket = useRef();
  const { dispatch: dispatchSearch } = useContext(SearchContext);
  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);

  useEffect(() => {
    dispatchSearch({ type: HIDE });
    if (stateUser.user.role === 'owner') {
      // connect socket and trigger
      const user = getDataLocalStorage({ key: 'user' });
      const token = getDataLocalStorage({ key: 'token' });

      socket.current = io.connect('http://localhost:5000', {
        transports: ['websocket'],
        query: {
          token,
          email: user.email,
        },
      });

      socket.current.emit(
        'load-notification',
        getDataLocalStorage({ key: 'user' }).email,
      );
      // end trigger
    }
    return () => {
      dispatchSearch({ type: SHOW });
      if (stateUser.user.role === 'owner') {
        socket.current.disconnect();
      }
    };
  }, []);

  const getProfile = async () => {
    try {
      const response = await API.get('auth/me');

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const { data, error, isSuccess, refetch } = useQuery('profile', getProfile);

  const mutation = useMutation(
    async (data) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const formData = new FormData();
        formData.append('imageFile', data, data.name);
        const response = await API.patch('user/update-photo', formData, config);

        if (response.status !== 200) {
          throw new Error('An error has occured');
        }
        return response.data;
      } catch (error) {
        throw new Error('Internal Server Error');
      }
    },
    {
      onSuccess: async ({ data }) => {
        dispatchUser({ type: UPDATE_PHOTO, payload: data.image_profile });
        refetch();
      },
      onError: async ({ error }) => {
        console.log('error', error);
      },
    },
  );

  const handleFile = (e) => {
    mutation.mutateAsync(e.target.files[0]);
  };

  return (
    <Container fluid className="bg-identity p-5" style={{ height: '87vh' }}>
      <Container className="bg-white p-3" style={{ maxWidth: '800px' }}>
        {isSuccess && (
          <Row noGutters>
            <Col md={9}>
              <Biodata user={data} />
            </Col>
            <Col md={3}>
              <Container
                className="d-flex justify-content-center align-items-center"
                style={{ width: '200px', height: '220px' }}
              >
                <Image
                  src={!data.image_profile ? imgProfile : data.image_profile}
                  fluid
                />
              </Container>
              <ButtonReuse
                className="mt-5"
                style={{
                  backgroundColor: '#5A57AB',
                  borderColor: '#5A57AB',
                  color: 'white',
                  textAlign: 'center',
                }}
                block
              >
                <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                  <span>Change Photo Profile</span>
                </label>
                <input
                  id="fileInput"
                  style={{ opacity: 1, display: 'none' }}
                  type="file"
                  onChange={handleFile}
                />
              </ButtonReuse>
            </Col>
          </Row>
        )}
      </Container>
    </Container>
  );
};

export default Profile;
