import { Alert } from 'bootstrap';
import { useContext, useState } from 'react';
import { Modal, Form, InputGroup, Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../config';
import { UserContext } from '../../contexts/UserContext';
import { HIDE_ALERT } from '../../contexts/UserContext/action';
import Styles from '../../css/CustomModalBox.module.css';
import ButtonReuse from '../utils/ButtonReuse';

const ModalSignup = ({ show, handleClose, handleTo, handleSubmitSignup }) => {
  const { state: stateUser, dispatch: dispatchUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleSingup = async (data) => {
    const config = {
      'Content-Type': 'application/json',
    };
    try {
      const response = await API.post('signup', data, config);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      console.log(`response.data`, response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Internal Server Error!');
    }
  };

  const mutation = useMutation(handleSingup, {
    onSuccess: async ({ data }) => {
      console.log(`data`, data);
      handleSubmitSignup({ isSignUp: false });
    },
    onError: async () => {
      console.log('error');
      handleSubmitSignup({ isSignUp: true });
    },
  });

  const onSubmit = (payload) => {
    // console.log(`payload`, payload);
    mutation.mutate(payload);
  };

  const loadData = async () => {
    try {
      const response = await API.get('roles');

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const { data, error, isSuccess } = useQuery('roles', loadData, {
    retry: false,
  });

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm();

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title className="font-weight-bold">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles.modalBody} style={{ height: '80vh' }}>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group>
            <Form.Label className="font-weight-bold">Full Name</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type="text"
              {...register('fullname', { required: 'Fullname is required' })}
            />

            {errors.fullname && <ErrMsg msg={errors.fullname.message} />}
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Username</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type="text"
              {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <ErrMsg msg={errors.username.message} />}
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="font-weight-bold">Email</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && errors.email.type === 'required' && (
              <ErrMsg msg={errors.email.message} />
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <ErrMsg msg="Invalid Email" />
            )}
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">Password</Form.Label>
            <Form.Control
              className="bg-identity font-weight-bold"
              type={`${showPassword ? 'text' : 'password'}`}
              {...register('password', {
                required: 'Password is Required',
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
                console.log(showPassword);
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

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">List As</Form.Label>
            <Form.Control
              as="select"
              className={`${Styles.select} bg-identity font-weight-bold`}
              {...register('role_id', { required: 'List As is required' })}
            >
              <option value=''>Select</option>
              {isSuccess &&
                data.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
            </Form.Control>
            <span className={Styles.caretDown}></span>
            {errors.role_id && <ErrMsg msg={errors.role_id.message} />}
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">Gender</Form.Label>
            <Form.Control
              as="select"
              className={`${Styles.select} bg-identity font-weight-bold`}
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value=''>Select</option>
              <option value="male">Laki-Laki</option>
              <option value="female">Perempuan</option>
            </Form.Control>
            <span className={Styles.caretDown}></span>
            {errors.gender && <ErrMsg msg={errors.gender.message} />}
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Phone</Form.Label>
            <InputGroup>
              <InputGroup.Prepend style={{ border: 'none' }}>
                <InputGroup.Text>+62</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                className="bg-identity font-weight-bold"
                type="number"
                {...register('phone_number', {
                  required: 'Phone Number is required',
                })}
              />
            </InputGroup>
            {errors.phone_number && (
              <ErrMsg msg={errors.phone_number.message} />
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label className="font-weight-bold">Address</Form.Label>
            <Form.Control
              as="textarea"
              className="bg-identity font-weight-bold"
              {...register('address', { required: 'Address is required' })}
            />
            {errors.address && <ErrMsg msg={errors.address.message} />}
          </Form.Group>

          <Container fluid className="px-0 pt-1">
            <ButtonReuse
              className="font-weight-bold my-2"
              style={{ backgroundColor: '#5A57AB', color: ' white' }}
              block
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
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
