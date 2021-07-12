import { useState } from 'react';
import Amenities from '../Amenities';
import InputDate from '../InputDate';
import CustomRadioButton from '../CustomRadioButton';

const Sidebar = ({ handleFilter }) => {
  const [payload, setPayload] = useState({
    typeRent: '',
    date: new Date(),
    amenities: '',
    bedroom: '',
    bathroom: '',
    price: '0',
  });

  const amenitiesArr = [
    {
      id: 1,
      name: 'Furnished',
      status: false,
    },
    {
      id: 2,
      name: 'Pet Allowed',
      status: false,
    },
    {
      id: 3,
      name: 'Shared Accomodation',
      status: false,
    },
  ];

  const propertyArr = [1, 2, 3, 4, 5];

  const typeOfRentArr = ['Day', 'Month', 'Year'];

  const handleTypeOfRent = (value) => {
    setPayload((currentState) => ({ ...currentState, typeRent: value }));
  };

  const handleInputDate = (date) => {
    setPayload((currentState) => ({ ...currentState, date }));
  };

  const handleAmenities = (value) => {
    setPayload((currentState) => ({
      ...currentState,
      amenities: value.join(','),
    }));
  };

  const handlePropertyRoom = (value) => {
    // const { detailPropertyRoom } = payload;

    const { title, qty } = value;

    setPayload((currentState) => ({
      ...currentState,
      [title.toLowerCase()]: qty,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter({
      ...payload,
      price: parseInt(payload.price) > 0 ? payload.price : '',
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}> Type of Rent</h4>
      <CustomRadioButton
        arrData={typeOfRentArr}
        handleSelected={handleTypeOfRent}
      />
      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}> Date</h4>
      <InputDate date={payload.date} handleInputDate={handleInputDate} />
      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Property Room</h4>
      <CustomRadioButton
        handleSelected={handlePropertyRoom}
        title="Bedroom"
        name="Beds"
        arrData={propertyArr}
      />

      <CustomRadioButton
        handleSelected={handlePropertyRoom}
        title="Bathroom"
        name="Baths"
        arrData={propertyArr}
      />

      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Amenities</h4>
      <Amenities
        handleAmenities={handleAmenities}
        stateAmenities={amenitiesArr}
      />
      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Budget</h4>
      <div
        style={{ display: 'flex', alignItems: 'center', paddingRight: '15px' }}
      >
        <h5>Less than IDR. </h5>
        <input
          className="totalBudget shadow-none"
          type="number"
          name="price"
          value={payload.price}
          onChange={(e) =>
            setPayload({
              ...payload,
              [e.target.name]: e.target.value,
            })
          }
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <button type="submit" className="buttonApply">
          APPLY
        </button>
      </div>
    </form>
  );
};

export default Sidebar;
