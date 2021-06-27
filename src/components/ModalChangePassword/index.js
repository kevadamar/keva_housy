import { useContext, useState } from 'react';
import { Modal, Form, Alert, Container } from 'react-bootstrap';
import Styles from '../../css/CustomModalBox.module.css';
import ButtonReuse from '../utils/ButtonReuse';
import { UserContext } from '../../contexts/UserContext';

const ModalChangePassword = ({ show, handleClose, handleChangedPassword }) => {
  const { state: stateUser } = useContext(UserContext);
  const {user} = stateUser
  const [payload, setPayload] = useState({
    oldPassword: '',
    newPassword: '',
    newConfirmPassword: '',
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


    if (payload.newConfirmPassword !== payload.newPassword && user.password === payload.newPassword) {
      setError(true)
    }
    else {
      handleChangedPassword(payload)
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody}>
        <Form onSubmit={handleSubmit}>
          
          <Form.Group>
            <Form.Label className="font-weight-bold">Old Password</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="oldPassword"
              type="password"
              value={payload.oldPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">New Password</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="newPassword"
              type="password"
              value={payload.newPassword}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Confirm Password</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              required
              name="confirmPassword"
              type="password"
              value={payload.newConfirmPassword}
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
              Save
            </ButtonReuse>
            {error && (
              <Alert
                variant="danger"
                className="text-center mt-3"
                onClose={() => setError(false)}
                dismissible
              >
                Password tidak sesuai
              </Alert>
            )}
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChangePassword;
