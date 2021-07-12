import { useContext, useEffect, useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { API } from '../../config';
import { SearchContext } from '../../contexts/SearchContext';
import { HIDE, SHOW } from '../../contexts/SearchContext/action';
import ButtonReuse from '../utils/ButtonReuse';
import Styles from './AddProperty.module.css';

const AddProperty = () => {
  const router = useHistory();

  const [payload, setPayload] = useState({
    amenities: [],
  });

  const [isError, setIsError] = useState(false);

  const [show, setshow] = useState(false);

  const [errorAmenities, setErrorAmenities] = useState(false);

  const [dataCities, setDataCities] = useState([]);

  const [firstImage, setFirstImage] = useState({ file: '', fileUrl: '' });
  const [secondImage, setSecondImage] = useState({ file: '', fileUrl: '' });
  const [thirdImage, setThirdImage] = useState({ file: '', fileUrl: '' });
  const [fourthImage, setFourthImage] = useState({ file: '', fileUrl: '' });

  const { dispatch: dispatchSearch } = useContext(SearchContext);

  const dataTypeRent = [
    { label: 'Day', value: 'Day' },
    { label: 'Month', value: 'Month' },
    { label: 'Year', value: 'Year' },
  ];
  const dataPropertyRoom = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ];

  useEffect(() => {
    dispatchSearch({ type: HIDE });
    return () => {
      dispatchSearch({ type: SHOW });
    };
  }, []);

  const fetchCity = async () => {
    try {
      const response = await API.get(`cities`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      const newData = response.data.data.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setDataCities(newData);
      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const postData = async (payload) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await API.post(`house`, payload, config);

      if (response.status !== 201) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      throw new Error('Interval Server Error');
    }
  };

  const mutation = useMutation(postData, {
    onSuccess: async ({ data }) => {
      console.log(`data add house`, data);
      setshow(true);
    },
    onError: async (error) => {
      console.log('error', error);
      setIsError(true);
    },
  });

  const { data, isSuccess } = useQuery('cities', fetchCity, {
    staleTime: 300000,
  });

  const handleChangeCheckbox = (e) => {
    if (payload.amenities.length === 0) {
      setErrorAmenities((currentState) => !currentState);
    }
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

  const onSubmit = (data) => {
    const formData = new FormData();
    // data body
    formData.append('name', data.nameProperty);
    formData.append('city_id', data.city.value);
    formData.append('address', data.address);
    formData.append('price', data.price);
    formData.append('typeRent', data.typeRent.value);
    formData.append('amenities', payload.amenities);
    formData.append('bedroom', data.bedroom.value);
    formData.append('bathroom', data.bathroom.value);
    formData.append('description', data.description);
    formData.append('area', data.area);
    // images
    formData.append('imageFile', firstImage.file, firstImage.file.name);
    formData.append('imageFile', secondImage.file, secondImage.file.name);
    formData.append('imageFile', thirdImage.file, thirdImage.file.name);
    formData.append('imageFile', fourthImage.file, fourthImage.file.name);

    mutation.mutate(formData);
  };

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    control,
  } = useForm();

  const controlStyle = () => ({
    borderColor: '#ced4da !important',
    boxShadow: 'none',
    backgroundColor: '#c4c4c440',
    ':hover': {
      cursor: 'pointer',
      borderColor: '#black !important',
    },
    ':focus': {
      borderColor: 'black !important',
      boxShadow: 'none',
      backgroundColor: 'white !important',
    },
    ':focus-within': {
      borderColor: 'black !important',
      boxShadow: 'none',
      backgroundColor: 'white !important',
    },
    ':active': {
      borderColor: 'black !important',
      boxShadow: 'none',
      backgroundColor: 'white !important',
    },
  });

  const colourStyles = {
    // container: (styles) => ({ ...styles, padding: '.375rem .75rem' }),
    control: (styles) => ({
      ...styles,
      ...controlStyle(),
      padding: '.2rem .75rem',
    }),
    placeholder: (styles) => ({
      ...styles,
      fontWeight: 'bold',
      color: '#495057',
    }),
    input: (styles) => ({ ...styles, fontWeight: 'bold !important' }),
    singleValue: (styles) => ({
      ...styles,
      fontWeight: 'bold !important',
      color: '#495057',
    }),
    dropdownIndicator: (styles) => ({ ...styles, display: 'none' }),
    indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
  };

  const ErrMsg = ({ msg }) => {
    return <span style={{ color: 'red' }}>{msg}</span>;
  };

  const AlertDialogSucc = ({ show, handleClose, msg, router }) => {
    const handleClicked = () => {
      router.push('/owner');
      handleClose();
    };

    return (
      <Modal show={show} backdrop="static" keyboard={false}>
        <Modal.Body>{ msg }</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClicked}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Container fluid className="bg-identity">
      <Container className="py-5">
        <h4>Add Property</h4>
        <Container className="mt-5">
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Form.Group>
              <Form.Label className="font-weight-bold">
                Name Property
              </Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                type="text"
                {...register('nameProperty', { required: 'Name is required' })}
              />
              {errors.nameProperty && (
                <ErrMsg msg={errors.nameProperty.message} />
              )}
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">City</Form.Label>
              {isSuccess && (
                <Controller
                  name="city"
                  control={control}
                  rules={{ required: 'City is required' }}
                  render={({ field: { onChange, value, ref } }) => (
                    <Select
                      label="Select"
                      inputRef={ref}
                      value={value}
                      onChange={onChange}
                      options={dataCities}
                      styles={colourStyles}
                    />
                  )}
                />
              )}
              <span className={Styles.caretDown}></span>

              {errors.city && <ErrMsg msg={errors.city.message} />}
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

            <Form.Group>
              <Form.Label className="font-weight-bold">Price</Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                type="text"
                {...register('price', { required: 'Price is required' })}
              />

              {errors.price && <ErrMsg msg={errors.price.message} />}
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">Type Of Rent</Form.Label>

              <Controller
                name="typeRent"
                control={control}
                rules={{ required: 'Type Rent is required' }}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    label="Select"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    options={dataTypeRent}
                    styles={colourStyles}
                  />
                )}
              />
              <span className={Styles.caretDown}></span>

              {errors.typeRent && <ErrMsg msg={errors.typeRent.message} />}
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
              {errorAmenities === 0 && <ErrMsg msg="Min 1 Amenities" />}
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">Bedroom</Form.Label>
              <Controller
                name="bedroom"
                control={control}
                rules={{ required: 'Bedroom is required' }}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    label="Select"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    options={dataPropertyRoom}
                    styles={colourStyles}
                  />
                )}
              />
              <span className={Styles.caretDown}></span>
              {errors.bedroom && <ErrMsg msg={errors.bedroom.message} />}
            </Form.Group>

            <Form.Group className={Styles.inputGroup}>
              <Form.Label className="font-weight-bold">Bathroom</Form.Label>
              <Controller
                name="bathroom"
                control={control}
                rules={{ required: 'Bathroom is required' }}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    label="Select"
                    inputRef={ref}
                    value={value}
                    onChange={onChange}
                    options={dataPropertyRoom}
                    styles={colourStyles}
                  />
                )}
              />
              <span className={Styles.caretDown}></span>
              {errors.bathroom && <ErrMsg msg={errors.bathroom.message} />}
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Area</Form.Label>
              <Form.Control
                className="bg-identity font-weight-bold"
                type="text"
                {...register('area', { required: 'Area is required' })}
              />
              {errors.area && <ErrMsg msg={errors.area.message} />}
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                className="bg-identity font-weight-bold"
                {...register('description', {
                  required: 'Description is required',
                })}
              />

              {errors.description && (
                <ErrMsg msg={errors.description.message} />
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label className="font-weight-bold">Images</Form.Label>
              <Container fluid className="d-flex px-0">
                <Container
                  fluid
                  className="px-0 mx-2 d-flex justify-content-center align-items-center"
                  style={{
                    width: '45%',
                    border: '1px solid black',
                    borderRadius: '25px',
                    position: 'relative',
                    backgroundColor: firstImage.file && 'grey',
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      cursor: !firstImage.file && 'pointer',
                      width: '100%',
                      height: '190px',
                    }}
                  >
                    {!firstImage.file ? (
                      <>
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="firstImage"
                        >
                          <span style={{ fontSize: '4.4em' }}>
                            <i
                              className="fa fa-file-image-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </label>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="firstImage"
                          accept="image/*"
                          onChange={(e) => {
                            e.stopPropagation();
                            setFirstImage({
                              file: e.target.files[0],
                              fileUrl: URL.createObjectURL(e.target.files[0]),
                            });
                          }}
                        />
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="firstImage"
                          className="text-center"
                        >
                          <h4>Main Image</h4>
                          <p>Upload here</p>
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={firstImage.fileUrl}
                          alt="First Img"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            fontSize: '2em',
                            zIndex: '1',
                            right: '10px',
                            top: '0',
                            color: 'red',
                          }}
                        >
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setFirstImage({ file: '', fileUrl: '' })
                            }
                          ></i>
                        </span>
                      </>
                    )}
                  </div>
                </Container>
                <Container
                  fluid
                  className="px-0 mx-2 d-flex justify-content-center align-items-center"
                  style={{
                    width: '45%',
                    border: '1px solid black',
                    borderRadius: '25px',
                    position: 'relative',
                    backgroundColor: secondImage.file && 'grey',
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      cursor: !secondImage.file && 'pointer',
                      width: '100%',
                      height: '190px',
                    }}
                  >
                    {!secondImage.file ? (
                      <>
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="secondImage"
                        >
                          <span style={{ fontSize: '4.4em' }}>
                            <i
                              className="fa fa-file-image-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </label>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="secondImage"
                          accept="image/*"
                          onChange={(e) => {
                            e.stopPropagation();
                            setSecondImage({
                              file: e.target.files[0],
                              fileUrl: URL.createObjectURL(e.target.files[0]),
                            });
                          }}
                        />
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="secondImage"
                          className="text-center"
                        >
                          <h4>First Image</h4>
                          <p>Upload here</p>
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={secondImage.fileUrl}
                          alt="First Img"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            fontSize: '2em',
                            zIndex: '1',
                            right: '10px',
                            top: '0',
                            color: 'red',
                          }}
                        >
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setSecondImage({ file: '', fileUrl: '' })
                            }
                          ></i>
                        </span>
                      </>
                    )}
                  </div>
                </Container>

                <Container
                  fluid
                  className="px-0 mx-2 d-flex justify-content-center align-items-center"
                  style={{
                    width: '45%',
                    border: '1px solid black',
                    borderRadius: '25px',
                    position: 'relative',
                    backgroundColor: thirdImage.file && 'grey',
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      cursor: !thirdImage.file && 'pointer',
                      width: '100%',
                      height: '190px',
                    }}
                  >
                    {!thirdImage.file ? (
                      <>
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="thirdImage"
                        >
                          <span style={{ fontSize: '4.4em' }}>
                            <i
                              className="fa fa-file-image-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </label>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="thirdImage"
                          accept="image/*"
                          onChange={(e) => {
                            e.stopPropagation();
                            setThirdImage({
                              file: e.target.files[0],
                              fileUrl: URL.createObjectURL(e.target.files[0]),
                            });
                          }}
                        />
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="thirdImage"
                          className="text-center"
                        >
                          <h4>Second Image</h4>
                          <p>Upload here</p>
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={thirdImage.fileUrl}
                          alt="First Img"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            fontSize: '2em',
                            zIndex: '1',
                            right: '10px',
                            top: '0',
                            color: 'red',
                          }}
                        >
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setThirdImage({ file: '', fileUrl: '' })
                            }
                          ></i>
                        </span>
                      </>
                    )}
                  </div>
                </Container>
                <Container
                  fluid
                  className="px-0 mx-2 d-flex justify-content-center align-items-center"
                  style={{
                    width: '45%',
                    border: '1px solid black',
                    borderRadius: '25px',
                    position: 'relative',
                    backgroundColor: fourthImage.file && 'grey',
                  }}
                >
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{
                      cursor: !fourthImage.file && 'pointer',
                      width: '100%',
                      height: '190px',
                    }}
                  >
                    {!fourthImage.file ? (
                      <>
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="fourthImage"
                        >
                          <span style={{ fontSize: '4.4em' }}>
                            <i
                              className="fa fa-file-image-o"
                              aria-hidden="true"
                            ></i>
                          </span>
                        </label>
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          id="fourthImage"
                          accept="image/*"
                          onChange={(e) => {
                            e.stopPropagation();
                            setFourthImage({
                              file: e.target.files[0],
                              fileUrl: URL.createObjectURL(e.target.files[0]),
                            });
                          }}
                        />
                        <label
                          style={{ cursor: 'pointer' }}
                          htmlFor="fourthImage"
                          className="text-center"
                        >
                          <h4>Third Image</h4>
                          <p>Upload here</p>
                        </label>
                      </>
                    ) : (
                      <>
                        <img
                          style={{ objectFit: 'contain', width: '100%' }}
                          src={fourthImage.fileUrl}
                          alt="First Img"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            fontSize: '2em',
                            zIndex: '1',
                            right: '10px',
                            top: '0',
                            color: 'red',
                          }}
                        >
                          <i
                            className="fa fa-times-circle"
                            aria-hidden="true"
                            style={{ cursor: 'pointer' }}
                            onClick={() =>
                              setFourthImage({ file: '', fileUrl: '' })
                            }
                          ></i>
                        </span>
                      </>
                    )}
                  </div>
                </Container>
              </Container>
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
          {isError && <h2 style={{ color: 'red' }}>Error From Server...</h2>}
        </Container>
        {show && (
          <AlertDialogSucc
            show={show}
            router={router}
            handleClose={() => setshow(false)}
            msg="Successfully Add House"
          />
        )}
      </Container>
    </Container>
  );
};

export default AddProperty;
