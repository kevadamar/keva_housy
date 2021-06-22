import Styles from '../css/Content.module.css';
import Card from './Card';
import Sidebar from './Sidebar';

const items = [
  {
    id: 1,
    price: 'Rp. 9.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 2,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '1,800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 2,
    price: 'Rp. 6.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 3,
    price: 'Rp. 6.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 4,
    price: 'Rp. 6.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 5,
    price: 'Rp. 6.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 6,
    price: 'Rp. 61.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 7,
    price: 'Rp. 6.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 8,
    price: 'Rp. 6.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
  {
    id: 9,
    price: 'Rp. 61.000.000',
    duration: 'Year',
    detailProperyRoom: [
      {
        name: 'Beds',
        qty: 1,
      },
      {
        name: 'Baths',
        qty: 1,
      },
      {
        name: 'sqft',
        qty: '800',
      },
    ],
    address: 'Tangerang Selata, Pondok Aren',
    amenities: 'Furnished',
  },
];

const Content = () => {
  return (
    <>
      <main>
        <div className={Styles.sideContent}>
          <Sidebar />
        </div>
        <div className={Styles.mainContent}>
          <div className={Styles.gridContent}>
            {items && items.map((item) => <Card key={item.id} item={item} />)}
          </div>
        </div>
      </main>
    </>
  );
};

export default Content;
