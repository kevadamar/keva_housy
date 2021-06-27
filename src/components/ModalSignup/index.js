import { Alert } from 'bootstrap';
import { useContext, useState } from 'react';
import { Modal, Form, InputGroup, Container } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { HIDE_ALERT } from '../../contexts/UserContext/action';
import Styles from '../../css/CustomModalBox.module.css';
import ButtonReuse from '../utils/ButtonReuse';

const ModalSignup = ({ show, handleClose, handleTo, handleSubmitSignup }) => {
  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);
  const [payload, setPayload] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender: '',
    address: '',
    role: '',
  });

  const handleChange = (e) => {
    setPayload((currenState) => ({
      ...currenState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    handleSubmitSignup(payload);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title className="font-weight-bold">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody} style={{ height: '80vh' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Full Name</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="fullname"
              type="text"
              value={payload.fullname}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Username</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="username"
              type="text"
              value={payload.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Email</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="email"
              type="email"
              value={payload.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="password"
              type="password"
              value={payload.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">List As</Form.Label>
            <Form.Control
              as="select"
              className={`${Styles.select} bg-identity font-weight-bold`}
              required
              name="role"
              value={payload.role}
              onChange={handleChange}
            >
              <option>Select</option>
              <option value="tenant">Tenant</option>
              <option value="owner">Owner</option>
            </Form.Control>
            <span className={Styles.caretDown}></span>
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">Gender</Form.Label>
            <Form.Control
              as="select"
              className={`${Styles.select} bg-identity font-weight-bold`}
              required
              name="gender"
              value={payload.gender}
              onChange={handleChange}
            >
              <option>Select</option>
              <option value="L">Laki-Laki</option>
              <option value="P">Perempuan</option>
            </Form.Control>
            <span className={Styles.caretDown}></span>
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Phone</Form.Label>
            <InputGroup>
              <InputGroup.Prepend style={{ border: 'none' }}>
                <InputGroup.Text>+62</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="bg-identity font-weight-bold"
                required
                name="phoneNumber"
                type="number"
                value={payload.phoneNumber}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Address</Form.Label>
            <Form.Control
              as="textarea"
              className="bg-identity font-weight-bold"
              required
              name="address"
              value={payload.address}
              onChange={handleChange}
            />
          </Form.Group>

          <Container fluid className="px-0 pt-1">
            <ButtonReuse
              className="font-weight-bold my-2"
              style={{ backgroundColor: '#5A57AB', color: ' white' }}
              type="submit"
              block
            >
              Sign Up
            </ButtonReuse>
            {stateUser.isSignUp && (
              <Alert
                variant="danger"
                className="text-center mt-3"
                onClose={() => dispatchUser({ type: HIDE_ALERT })}
                dismissible
              >
                Username atau Password tidak sesuai
              </Alert>
            )}
            <ButtonReuse
              variant="light-secondary"
              style={{ color: '#B1B1B1' }}
              block
              onClick={handleTo}
            >
              You already have an account? Klik
              <span className="font-weight-bold ml-1">Here</span>
            </ButtonReuse>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignup;
