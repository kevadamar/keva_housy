import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ModalChangePassword from '../ModalChangePassword';

const Biodata = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <h3>Personal Info</h3>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '2.5em' }}
            className="fa fa-user-circle"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.fullname}</h5>
          <p className="text-secondary mb-0">Full name</p>
        </span>
      </Container>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '2.5em' }}
            className="fa fa-envelope"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.email}</h5>
          <p className="text-secondary mb-0">Email</p>
        </span>
      </Container>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '3.5em' }}
            className="fa fa-lock"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5
            className="mb-0"
            style={{ color: '#5A57AB', cursor: 'pointer' }}
            onClick={() => setShowModal(true)}
          >
            Change Password
          </h5>
          <p className="text-secondary mb-0">Password</p>
        </span>
      </Container>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '2.5em' }}
            className="fa fa-certificate"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.listAs.name}</h5>
          <p className="text-secondary mb-0">Status</p>
        </span>
      </Container>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '2.5em' }}
            className="fa fa-transgender"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">
            {user.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
          </h5>
          <p className="text-secondary mb-0">Gender</p>
        </span>
      </Container>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '2.5em' }}
            className="fa fa-phone"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">+62{user.phone_number}</h5>
          <p className="text-secondary mb-0">Mobile Phone</p>
        </span>
      </Container>

      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ color: 'grey', fontSize: '3em' }}
            className="fa fa-map-marker"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.address}</h5>
          <p className="text-secondary mb-0">Address</p>
        </span>
      </Container>

      {showModal && (
        <ModalChangePassword
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Biodata;
