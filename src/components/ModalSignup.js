import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Styles from '../css/CustomModalBox.module.css';
import ButtonReuse from './utils/ButtonReuse';

const ModalSignup = (props) => {
  const { handleClose, show, handleSubmitSignup } = props;
  const [payload, setPayload] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setPayload((currenState) => ({
      ...currenState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitSignup(payload);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title className="font-weight-bold">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody}>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Full Name</Form.Label>
            <Form.Control
              className="bg-identity"
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
              className="bg-identity"
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
              className="bg-identity"
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
              className="bg-identity"
              required
              name="password"
              type="password"
              value={payload.password}
              onChange={handleChange}
            />
          </Form.Group>
          <ButtonReuse
            className="font-weight-bold"
            style={{ backgroundColor: '#5A57AB', color: ' white' }}
            type="submit"
            block
          >
            Sign Up
          </ButtonReuse>
        </Form>
        <ButtonReuse
          variant="light-secondary"
          style={{ color: '#B1B1B1' }}
          block
        >
          You already have an account? Klik
          <span className="font-weight-bold ml-1">Here</span>
        </ButtonReuse>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignup;
