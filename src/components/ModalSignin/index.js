import { useState } from 'react';
import { Modal, Form, Alert, Container } from 'react-bootstrap';
import Styles from '../../css/CustomModalBox.module.css';
import ButtonReuse from '../utils/ButtonReuse';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../config';
import { useForm } from 'react-hook-form';

const ModalSignin = ({ show, handleClose, handleTo, handleSubmitLogin }) => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (data) => {
    const config = {
      'Content-Type': 'application/json',
    };
    const response = await API.post('signin', data, config);

    if (response.status !== 200) {
      throw new Error('An error has occured');
    }
    // console.log(`response.data`, response.data);
    return response.data;
  };

  const mutation = useMutation(handleLogin, {
    onSuccess: async ({ data }) => {
      setAuthToken(data.token);
      // console.log(`data`, data);
      handleSubmitLogin(data);
    },
    onError: async () => {
      console.log('error');
      setError(!error);
    },
  });

  const onSubmit = (payload) => {
    mutation.mutate(payload);
  };

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title>Sign in</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Username</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <ErrMsg msg={errors.username.message} />}
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">Password</Form.Label>

            <Form.Control
              className="bg-identity font-weight-bold"
              type={`${showPassword ? 'text' : 'password'}`}
              {...register('password', {
                required: 'Password is required',
                minLength: 8,
              })}
            />
            <span
              className={`${Styles.iconPassword} ${
                errors.password
                  ? `${Styles.iconPasswordError}`
                  : `${Styles.iconPasswordDefault}`
              }`}
              tabIndex="0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword((currentState) => !currentState);
              }}
            >
              <i
                className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                aria-hidden="true"
              ></i>
            </span>

            {errors.password && errors.password.type === 'required' && (
              <ErrMsg msg={errors.password.message} />
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <ErrMsg msg="Min 8 Characters" />
            )}
          </Form.Group>
          <Container fluid className="px-0 pt-1">
            <ButtonReuse
              className="font-weight-bold"
              style={{
                backgroundColor: '#5A57AB',
                color: ' white',
                borderColor: '#5A57AB',
              }}
              block
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
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
