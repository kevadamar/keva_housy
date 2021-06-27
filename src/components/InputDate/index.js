import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Styles from './InputDate.module.css';
import CustomInputDate from '../utils/CustomInputDate';

const InputDate = ({ date, handleInputDate }) => {
  return (
    <Container
      fluid
      className={`${Styles.date} align-items-center d-flex pl-0`}
      style={{ cursor: 'pointer' }}
    >
      <DatePicker
        className={Styles.datePicker}
        placeholderText="Select your date"
        dateFormat="dd MMMM yyyy"
        selected={date}
        onChange={(datePicked) => handleInputDate(datePicked)}
        customInput={<CustomInputDate />}
      />
    </Container>
  );
};

export default InputDate;
