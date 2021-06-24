import { Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import styles from '../css/InputDate.module.css';

const InputDate = ({ date, handleInputDate }) => {
  return (
    <Container fluid style={{ paddingLeft: '0' }}>
      <span className={styles.dateForm}>
        <span style={{ fontSize: '1.3em' }}>
          <i className="fa fa-calendar" aria-hidden="true"></i>
        </span>
        <span className={styles.separator}>
          |
        </span>
        <DatePicker
          className={styles.datePicker}
          placeholderText="Select your date"
          dateFormat="dd MMMM yyyy"
          selected={date}
          onChange={(datePicked) => handleInputDate(datePicked)}
        />
        <span className={styles.dropdownIcon}>
          <i className="fa fa-caret-down" aria-hidden="true"></i>
        </span>
      </span>
    </Container>
  );
};

export default InputDate;
