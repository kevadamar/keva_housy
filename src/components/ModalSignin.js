import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import Styles from '../css/CustomModalBox.module.css';
import ButtonReuse from './utils/ButtonReuse';

const ModalSignin = (props) => {
  const {
    handleClose,
    show,
    handleSubmitLogin,
  } = props;
  const [payload, setPayload] = useState({
    username: '',
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
    handleSubmitLogin(payload)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody}>
        <Form onSubmit={handleSubmit}>
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
            Sign In
          </ButtonReuse>
        </Form>
        <ButtonReuse
          variant="light-secondary"
          style={{ color: '#B1B1B1' }}
          block
        >
          Don't have an account? Klik
          <span className="font-weight-bold ml-1">Here</span>
        </ButtonReuse>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignin;
