import { useState } from 'react';
import { Modal, Form, Alert, Container } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import Styles from '../../css/CustomModalBox.module.css';
import ButtonReuse from '../utils/ButtonReuse';
import { API } from '../../config';

const ModalChangePassword = ({ show, handleClose }) => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    newConfirmPassword: false,
  });

  const handleChangePassword = async (data) => {
    try {
      const response = await API.patch('user/update', data);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      // console.log(`response.data`, response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error!');
    }
  };

  const mutation = useMutation(handleChangePassword, {
    onSuccess: async ({ data }) => {
      console.log(`data`, data);
      handleClose();
    },
    onError: async () => {
      console.log('error');
      setError(true);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(`data`, data);
    if (data.newConfirmPassword !== data.newPassword) {
      setError(true);
    } else {
      mutation.mutate({ password: data.newConfirmPassword });
    }
  };

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">New Password</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type={`${showPassword.newPassword ? 'text' : 'password'}`}
              {...register('newPassword', {
                required: 'New Password is required',
                minLength: 8,
              })}
            />
            <span
              className={`${Styles.iconPassword} ${
                errors.newPassword
                  ? `${Styles.iconPasswordError}`
                  : `${Styles.iconPasswordDefault}`
              }`}
              tabIndex="0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword((currentState) => ({
                  ...currentState,
                  newPassword: !currentState.newPassword,
                }));
              }}
            >
              <i
                className={`fa ${
                  showPassword.newPassword ? 'fa-eye-slash' : 'fa-eye'
                }`}
                aria-hidden="true"
              ></i>
            </span>
            {errors.newPassword && errors.newPassword.type === 'required' && (
              <ErrMsg msg={errors.newPassword.message} />
            )}
            {errors.newPassword && errors.newPassword.type === 'minLength' && (
              <ErrMsg msg="Min 8 Characters" />
            )}
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">
              Confirm Password
            </Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type={`${showPassword.newConfirmPassword ? 'text' : 'password'}`}
              {...register('newConfirmPassword', {
                required: 'Confirm Password is required',
                minLength: 8,
              })}
            />

            <span
              className={`${Styles.iconPassword} ${
                errors.newConfirmPassword
                  ? `${Styles.iconPasswordError}`
                  : `${Styles.iconPasswordDefault}`
              }`}
              tabIndex="0"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowPassword((currentState) => ({
                  ...currentState,
                  newConfirmPassword: !currentState.newConfirmPassword,
                }));
              }}
            >
              <i
                className={`fa ${
                  showPassword.newConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
                }`}
                aria-hidden="true"
              ></i>
            </span>
            {errors.newConfirmPassword &&
              errors.newConfirmPassword.type === 'required' && (
                <ErrMsg msg={errors.newConfirmPassword.message} />
              )}
            {errors.newConfirmPassword &&
              errors.newConfirmPassword.type === 'minLength' && (
                <ErrMsg msg="Min 8 Characters" />
              )}
          </Form.Group>

          <Container fluid className="px-0 pt-1">
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
            <ButtonReuse
              className="font-weight-bold"
              style={{ backgroundColor: '#5A57AB', color: ' white' }}
              type="submit"
              block
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              Save
            </ButtonReuse>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChangePassword;
