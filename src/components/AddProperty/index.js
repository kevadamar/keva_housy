import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import ButtonReuse from '../utils/ButtonReuse';
import Styles from './AddProperty.module.css';

const AddProperty = () => {
  const [payload, setPayload] = useState({
    nameProperty: '',
    city: '',
    address: '',
    price: '',
    typeOfRent: '',
    amenities: [],
    bedroom: '',
    bathroom: '',
  });

  const handleChangeInput = (e) => {
    setPayload((currenState) => ({
      ...currenState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      setPayload((currentState) => ({
        ...currentState,
        amenities: currentState.amenities.concat(e.target.name),
      }));
    } else {
      setPayload((currentState) => ({
        ...currentState,
        amenities: currentState.amenities.filter(
          (amenity) => amenity !== e.target.name,
        ),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container fluid className="bg-identity">
      <Container className="py-5">
        <h4>Add Property</h4>
        <Container className="mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Name Property
              </Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                required
                name="nameProperty"
                type="text"
                value={payload.nameProperty}
                onChange={handleChangeInput}
              />
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">City</Form.Label>
              <Form.Control
                as="select"
                className={`${Styles.select} bg-identity font-weight-bold`}
                required
                name="city"
                value={payload.city}
                onChange={handleChangeInput}
              >
                <option>Select</option>
                <option value="jakarta">Jakarta</option>
                <option value="tangerang">Tangerang</option>
                <option value="bogor">Bogor</option>
              </Form.Control>
              <span className={Styles.caretDown}></span>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Address</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-identity font-weight-bold"
                required
                name="address"
                value={payload.address}
                onChange={handleChangeInput}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Price</Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                required
                name="price"
                type="text"
                value={payload.price}
                onChange={handleChangeInput}
              />
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">Type Of Rent</Form.Label>
              <Form.Control
                as="select"
                className={`${Styles.select} bg-identity font-weight-bold`}
                required
                name="typeOfRent"
                value={payload.typeOfRent}
                onChange={handleChangeInput}
              >
                <option>Select</option>
                <option value="Day">Day</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </Form.Control>
              <span className={Styles.caretDown}></span>
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Amenities</Form.Label>

              <span className="d-flex justify-content-around">
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    name="Furnished"
                    label="Furnished"
                    onChange={(e) => handleChangeCheckbox(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox1">
                  <Form.Check
                    type="checkbox"
                    name="Pet Allowed"
                    label="Pet Allowed"
                    onChange={(e) => handleChangeCheckbox(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox2">
                  <Form.Check
                    type="checkbox"
                    name="Shared Accomodation"
                    label="Shared Accomodation"
                    onChange={(e) => handleChangeCheckbox(e)}
                  />
                </Form.Group>
              </span>
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">Bedroom</Form.Label>
              <Form.Control
                as="select"
                className={`${Styles.select} bg-identity font-weight-bold`}
                required
                name="bedroom"
                value={payload.bedroom}
                onChange={handleChangeInput}
              >
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
              <span className={Styles.caretDown}></span>
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">Bathroom</Form.Label>
              <Form.Control
                as="select"
                className={`${Styles.select} bg-identity font-weight-bold`}
                required
                name="bathroom"
                value={payload.bathroom}
                onChange={handleChangeInput}
              >
                <option>Select</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
              <span className={Styles.caretDown}></span>
            </Form.Group>

            <Container
              fluid
              className="d-flex px-0 pt-1 justify-content-center"
            >
              <ButtonReuse
                className="font-weight-bold my-2"
                style={{
                  backgroundColor: '#5A57AB',
                  color: ' white',
                  width: '50%',
                }}
                type="submit"
              >
                SAVE
              </ButtonReuse>
            </Container>
          </Form>
        </Container>
      </Container>
    </Container>
  );
};

export default AddProperty;
