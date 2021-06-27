import { useState } from 'react';
import { ButtonGroup, Container, ToggleButton } from 'react-bootstrap';
import Styles from './CustomRadioButton.module.css';

const CustomRadioButton = ({ title, name, arrData, handleSelected }) => {
  const [isSelected, setIsSelected] = useState(null);
  const handleClick = (e) => {
    const { value } = e.target;

    if (name) {
      const newValue = parseInt(value);
      handleSelected({ name, qty: newValue });
      setIsSelected(newValue);
    } else {
      handleSelected(value);
      setIsSelected(value);
    }
  };

  return (
    <>
      {title && <p style={{ marginTop: '10px', color: '#929292' }}>{title}</p>}
      <Container
        className="d-flex justify-content-between my-1"
        fluid
        style={{ paddingLeft: '0' }}
      >
        <ButtonGroup className="w-100">
          <Container
            fluid
            className="d-flex justify-content-between px-0 flex-wrap overide-btn-color"
          >
            {arrData.map((value, index) => (
              <ToggleButton
                key={index}
                tabIndex="0"
                id={`radio-${index}`}
                type="radio"
                className={Styles.button}
                variant="secondary"
                onClick={(e) => handleClick(e)}
                name={value}
                checked={value === isSelected}
                value={value}
              >
                {value}
                {arrData.length === value && '+'}
              </ToggleButton>
            ))}
          </Container>
        </ButtonGroup>
      </Container>
    </>
  );
};
export default CustomRadioButton;
