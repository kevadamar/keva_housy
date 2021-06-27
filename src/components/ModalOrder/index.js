import { forwardRef, useState } from 'react';
import { Modal, Form, Container } from 'react-bootstrap';
import ReactDatePicker from 'react-datepicker';
import Styles from '../../css/CustomModalBox.module.css';
import Styles2 from './ModalOrder.module.css';
import ButtonReuse from '../utils/ButtonReuse';

const ModalOrder = ({ show, handleClose, handleSubmitBooking }) => {
  const [payload, setPayload] = useState({
    checkIn: '',
    checkOut: '',
  });

  const handleChangeCheckIn = (value) => {
    setPayload((currenState) => ({
      ...currenState,
      checkIn: value,
    }));
  };

  const handleChangeCheckOut = (value) => {
    setPayload((currenState) => ({
      ...currenState,
      checkOut: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSubmitBooking(payload);
  };

  const CustomDate = forwardRef(({ value, onClick }, ref) => {
    return (
      <Container
        fluid
        className={`${Styles2.date} bg-identity pl-4 pr-2 w-100`}
        onClick={onClick}
        ref={ref}
      >
        <span style={{ fontSize: '1.3em' }}>
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </span>
        <span className={Styles2.separator}>|</span>
        {value}
        <span className={Styles2.dropdownIcon}>
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        </span>
      </Container>
    );
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className={Styles.modalHeader}>
        <Modal.Title className="font-weight-bold">Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body className={Styles2.modalBody}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">Check-In</Form.Label>
            <ReactDatePicker
              className={Styles2.datePicker}
              placeholderText="Select your date"
              dateFormat="dd MMMM yyyy"
              selected={payload.checkIn || new Date()}
              onChange={(datePicked) => handleChangeCheckIn(datePicked)}
              customInput={<CustomDate />}
            />
            <span className={Styles2.caretDown}></span>
          </Form.Group>

          <Form.Group className={Styles.inputGroup}>
            <Form.Label className="font-weight-bold">Check-Out</Form.Label>
            <ReactDatePicker
              className={Styles2.datePicker}
              placeholderText="Select your date"
              dateFormat="dd MMMM yyyy"
              selected={payload.checkOut}
              onChange={(datePicked) => handleChangeCheckOut(datePicked)}
              customInput={<CustomDate />}
            />
            <span className={Styles2.caretDown}></span>
          </Form.Group>

          <Container fluid className="px-0 pt-1">
            <ButtonReuse
              className="font-weight-bold my-2"
              style={{ backgroundColor: '#5A57AB', color: ' white' }}
              type="submit"
              block
              disabled={(!payload.checkIn || !payload.checkOut)}
            >
              ORDER
            </ButtonReuse>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalOrder;
