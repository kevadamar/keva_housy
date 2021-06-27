import { useState } from 'react';
import { Container } from 'react-bootstrap';
import ModalChangePassword from '../ModalChangePassword';

const Biodata = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const handleChangedPassword = (payload) => {
    console.log(payload);
  };
  return (
    <>
      <h3>Personal Info</h3>
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '2.5em' }}
            className="fa fa-user-circle"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.fullname}</h5>
          <p className="text-secondary mb-0">Full name</p>
        </span>
      </Container>
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '2.5em' }}
            className="fa fa-envelope"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.email}</h5>
          <p className="text-secondary mb-0">Email</p>
        </span>
      </Container>
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '3.5em' }}
            className="fa fa-lock"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5
            className="mb-0 text-primary"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowModal(true)}
          >
            Change Password
          </h5>
          <p className="text-secondary mb-0">Password</p>
        </span>
      </Container>
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '2.5em' }}
            className="fa fa-certificate"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.role}</h5>
          <p className="text-secondary mb-0">Status</p>
        </span>
      </Container>
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '2.5em' }}
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
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '2.5em' }}
            className="fa fa-phone"
            aria-hidden="true"
          ></i>
        </span>
        <span className="d-flex flex-column">
          <h5 className="mb-0">{user.phoneNumber}</h5>
          <p className="text-secondary mb-0">Mobile Phone</p>
        </span>
      </Container>
      {/* // name */}
      <Container fluid className="px-0 d-flex align-items-center py-2">
        <span className="pr-3">
          <i
            style={{ fontSize: '3em' }}
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
          handleChangedPassword={handleChangedPassword}
        />
      )}
    </>
  );
};

export default Biodata;
