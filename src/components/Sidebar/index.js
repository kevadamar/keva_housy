import { useState } from 'react';
import Aminities from '../Amenities';
import InputDate from '../InputDate';
import { items as data } from '../../data';
import { formatNumberToIDR, formatPriceStringToInt } from '../../helper';
import CustomRadioButton from '../CustomRadioButton';

const Sidebar = ({ handleFilter }) => {
  const [payload, setPayload] = useState({
    duration: '',
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
    detailPropertyRoom: [
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
    price: '0',
  });

  const aminitiesArr = [1, 2, 3, 4, 5];

  const typeOfRentArr = ['Day', 'Month', 'Year'];

  const handleTypeOfRent = (value) => {
    setPayload((currentState) => ({ ...currentState, duration: value }));
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
    const { detailPropertyRoom } = payload;
    const updatePropertyRoom = detailPropertyRoom.map((item) => {
      if (item.name === value.name) {
        return { ...item, qty: value.qty };
      }
      return { ...item };
    });
    setPayload((currentState) => ({
      ...currentState,
      detailPropertyRoom: updatePropertyRoom,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // filter by price,duration,aminities,detail property,
    const resultsByDuration = data.filter(
      (item) => item.duration === payload.duration,
    );

    // filter by price
    const resultsByPrice = (resultsByDuration) =>
      resultsByDuration.filter((item) => {
        if (formatNumberToIDR(payload.price) <= 0) {
          return true;
        }
        if (item.price <= formatPriceStringToInt(payload.price)) {
          return true;
        }
        return false;
      });

    /// filter by property
    const resultsByProperty = (resultsByPrice) => {
      return resultsByPrice.filter((item) => {
        if (
          payload.detailPropertyRoom[0].qty === 0 &&
          payload.detailPropertyRoom[1].qty === 0
        ) {
          return true;
        }

        if (
          item.detailPropertyRoom[0].qty ===
            payload.detailPropertyRoom[0].qty ||
          item.detailPropertyRoom[1].qty === payload.detailPropertyRoom[1].qty
        ) {
          return true;
        }
        return false;
      });
    };

    //filter by aminities
    const resultsByAminities = (resultsByProperty) => {
      return resultsByProperty.filter((item) => {
        if (
          !payload.aminities[0].status &&
          !payload.aminities[1].status &&
          !payload.aminities[2].status
        ) {
          return true;
        }

        if (
          item.amenities[0].status === payload.aminities[0].status ||
          item.amenities[1].status === payload.aminities[1].status ||
          item.amenities[2].status === payload.aminities[2].status
        ) {
          return true;
        }
        return false;
      });
    };

    const resultsFilter = resultsByAminities(
      resultsByProperty(resultsByPrice(resultsByDuration)),
    );

    handleFilter(resultsFilter);
  };

  return (
    <form onSubmit={handleSubmit}>
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
        arrData={aminitiesArr}
      />

      <CustomRadioButton
        handleSelected={handlePropertyRoom}
        title="Bathroom"
        name="Baths"
        arrData={aminitiesArr}
      />

      <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Aminities</h4>
      <Aminities
        handleAminities={handleAminities}
        stateAminities={payload.aminities}
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
        <button className="buttonApply">APPLY</button>
      </div>
    </form>
  );
};

export default Sidebar;
