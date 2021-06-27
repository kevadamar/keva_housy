import { useContext, useState } from 'react';
import { Modal, Form, Alert, Container } from 'react-bootstrap';
import Styles from '../../css/CustomModalBox.module.css';
import ButtonReuse from '../utils/ButtonReuse';
import { UserContext } from '../../contexts/UserContext';

const ModalSignin = ({ show, handleClose, handleTo, handleSubmitLogin }) => {
  const { state: stateUser } = useContext(UserContext);
  const [payload, setPayload] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setPayload((currenState) => ({
      ...currenState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const resultCheck = stateUser.tempUser.find(
      (user) =>
        user.username === payload.username &&
        user.password === payload.password,
    );

    if (resultCheck) {
      handleSubmitLogin(resultCheck);
    } else {
      setError(!error);
    }
  };

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
              className="bg-identity font-weight-bold"
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
              className="bg-identity font-weight-bold"
              required
              name="password"
              type="password"
              value={payload.password}
              onChange={handleChange}
            />
          </Form.Group>
          <Container fluid className="px-0 pt-1">
            <ButtonReuse
              className="font-weight-bold"
              style={{ backgroundColor: '#5A57AB', color: ' white' }}
              type="submit"
              block
            >
              Sign In
            </ButtonReuse>
            {error && (
              <Alert
                variant="danger"
                className="text-center mt-3"
                onClose={() => setError(false)}
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
              Don't have an account? Klik
              <span className="font-weight-bold ml-1">Here</span>
            </ButtonReuse>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalSignin;
