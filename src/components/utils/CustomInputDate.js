import { forwardRef } from 'react';
import { Container } from 'react-bootstrap';
import Styles from '../InputDate/InputDate.module.css';
const CustomInputDate = forwardRef(({ value, onClick }, ref) => {
  return (
    <Container
      fluid
      className={`${Styles.date} bg-identity px-2 w-100`}
      onClick={onClick}
      ref={ref}
    >
      <span style={{ fontSize: '1.3em' }}>
        <i className="fa fa-calendar" aria-hidden="true"></i>
      </span>
      <span className={Styles.separator}>|</span>
      {value}
      <span className={Styles.dropdownIcon}>
        <i className="fa fa-caret-down" aria-hidden="true"></i>
      </span>
    </Container>
  );
});

export default CustomInputDate;
