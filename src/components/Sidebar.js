import { useState } from 'react';
import Aminities from './Aminities';
import CustomPropertyRoom from './CustomProperyRoom';
import TypeOfRent from './TypeOfRent';

const Sidebar = () => {
  const [payload, setPayload] = useState({
    typeOfRent: '',
    date: new Date(),
    propertyRoom: '',
    aminities: [],
    totalBudget: '600.000.000',
  });

  return (
    <>
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}> Type of Rent</h2>
      <TypeOfRent />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}> Date</h2>
      <input
        style={{ padding: '13px 21px', width: '395px' }}
        type="date"
        date-date-format="dd-mmmm-yyyy"
      />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>
        {' '}
        Property Room
      </h2>
      <CustomPropertyRoom title="Bedroom" />
      <CustomPropertyRoom title="Bathroom" />
      <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Aminities</h2>
      <Aminities />
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
    </>
  );
};

export default Sidebar;
