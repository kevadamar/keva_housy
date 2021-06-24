import { useState } from 'react';
import Aminities from './Aminities';
import CustomPropertyRoom from './CustomPropertyRoom';
import InputDate from './InputDate';
import TypeOfRent from './TypeOfRent';

const Sidebar = () => {
  const [payload, setPayload] = useState({
    typeOfRent: '',
    date: new Date(),
    aminities: [
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
    ],
    propertyRoom: [
      {
        name: 'Beds',
        qty: 0,
      },
      {
        name: 'Baths',
        qty: 0,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    totalBudget: '600.000.000',
  });

  const handleTypeOfRent = (value) => {
    setPayload((currentState) => ({ ...currentState, typeOfRent: value }));
  };

  const handleInputDate = (date) => {
    setPayload((currentState) => ({ ...currentState, date }));
  };

  const handleAminities = (value) => {
    const { aminities } = payload;
    const updateaminities = aminities.map((item) => {
      if (item.id === value.id) {
        console.log(value);
        return { ...item, status: value.status };
      }
      return { ...item };
    });
    setPayload((currentState) => ({
      ...currentState,
      aminities: updateaminities,
    }));
  };

  const handlePropertyRoom = (value) => {
    const { propertyRoom } = payload;
    const updatePropertyRoom = propertyRoom.map((item) => {
      if (item.name === value.name) {
        return { ...item, qty: value.qty };
      }
      return { ...item };
    });
    setPayload((currentState) => ({
      ...currentState,
      propertyRoom: updatePropertyRoom,
    }));
  };

  const handleSubmit =(e) => {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}> Type of Rent</h2>
      <TypeOfRent handleTypeOfRent={handleTypeOfRent} />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}> Date</h2>
      <InputDate date={payload.date} handleInputDate={handleInputDate} />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Property Room</h2>
      <CustomPropertyRoom
        handlePropertyRoom={handlePropertyRoom}
        title="Bedroom"
        name="Beds"
      />
      <CustomPropertyRoom
        handlePropertyRoom={handlePropertyRoom}
        title="Bathroom"
        name="Baths"
      />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Aminities</h2>
      <Aminities
        handleAminities={handleAminities}
        stateAminities={payload.aminities}
      />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Budget</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h4>Less than IDR. </h4>
        <input
          className="totalBudget"
          type="text"
          name="totalBudget"
          value={payload.totalBudget}
          onChange={(e) =>
            setPayload({ ...payload, [e.target.name]: e.target.value })
          }
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <button className="buttonApply">APPLY</button>
      </div>
    </form>
  );
};

export default Sidebar;
