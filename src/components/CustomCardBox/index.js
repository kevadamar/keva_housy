import { useContext, useState } from 'react';
import { Container, Modal, Table } from 'react-bootstrap';
import ButtonReuse from '../utils/ButtonReuse';

import brandIcon from '../../assets/images/brand.svg';
import ellipseStart from '../../assets/images/ellipse-start.svg';
import verticalLine from '../../assets/images/line-icon.svg';
import ellipseEnd from '../../assets/images/ellipse-end.svg';

import Styles from './CustomCard.module.css';
import { useHistory } from 'react-router-dom';
import { BookingContext } from '../../contexts/BookingContext';
import {
  getDataLocalStorage,
  removeDataLocalStorage,
  saveToLocalStorage,
} from '../../helper';

const CustomCardBox = ({ book, pushTo, type }) => {
  const router = useHistory();

  const { state, dispatch } = useContext(BookingContext);

  const [show, setshow] = useState(false);

  const formatDateOrder = (date) => {
    const dayNumber = new Date(date).getDay();
    const monthNumber = new Date(date).getMonth();

    const day = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'Desember',
    ];

    return `${day[dayNumber]}, ${new Date(date).getDate()} ${
      month[monthNumber]
    } ${new Date(date).getFullYear()}`;
  };

  const handlePushTo = () => {
    router.push(pushTo);
    handlePay();
  };

  const handlePay = () => {
    const result = state.booking.map((item) => {
      if (item.id === book.id) {
        item.status = 2;
        return item;
      }
      return item;
    });
    console.log(result);
    const resultHistory = getDataLocalStorage({ key: 'history' });

    saveToLocalStorage({
      key: 'history',
      payload: !resultHistory ? result : resultHistory.concat(result),
    });
    dispatch({ type: 'REMOVE' });
    removeDataLocalStorage({ key: 'booking' });
  };
  return (
    <>
      <Container style={{ border: '2px solid #dee2e6' }}>
        <div className={Styles.bookingCardHeader}>
          <img src={brandIcon} alt="brand icon" />
          <div className={Styles.headerTitle}>
            {type === 'history' ? (
              <h2 className={Styles.bookingTitle}>Invoice</h2>
            ) : (
              <h2 className={Styles.bookingTitle}>Booking</h2>
            )}
            <p className={Styles.bookingDate}>
              {formatDateOrder(book.orderedDate)}
            </p>
          </div>
        </div>
        <div className={Styles.cardContent}>
          <div className={Styles.cardContentName}>
            <h2>{`House ${book.houseName}`}</h2>
            <p className={Styles.houseAddress}>{book.house.address}</p>
            <div className={Styles.bookingStatus}>
              {book.status === 3 ? (
                <div className={Styles.approveStatus}>Approve</div>
              ) : book.status === 0 ? (
                <div className={Styles.cancelStatus}>Cancel</div>
              ) : book.status === 2 ? (
                <div className={Styles.waitingStatus}>Waiting Approve</div>
              ) : (
                <div className={Styles.waitingPaymentStatus}>
                  Waiting Payment
                </div>
              )}
            </div>
          </div>

          <div className={Styles.cardContentDate}>
            <div className={Styles.iconWrapper}>
              <img src={ellipseStart} alt="ellipse start" />
              <img src={verticalLine} alt="vertical line" />
              <img src={ellipseEnd} alt="ellipse end" />
            </div>

            <div className={Styles.dateWrapper}>
              <div className={Styles.checkinWrapper}>
                <h3>Check-in</h3>
                <p>{formatDateOrder(book.durationDate.checkIn)}</p>
              </div>

              <div className={Styles.checkoutWrapper}>
                <h3>Check-out</h3>
                <p>{formatDateOrder(book.durationDate.checkOut)}</p>
              </div>
            </div>
          </div>

          <div className={Styles.cardContentVariant}>
            <div className={Styles.amenities}>
              <h3>Amenities</h3>
              <div>
                <p>
                  {book.house.amenities[0].status &&
                    book.house.amenities[0].name}
                </p>
                <p>
                  {book.house.amenities[1].status &&
                    book.house.amenities[1].name}
                </p>
                <p>
                  {book.house.amenities[2].status &&
                    book.house.amenities[2].name}
                </p>
              </div>
            </div>

            <div className={Styles.duration}>
              <h3>Type of Rent</h3>
              <p>{book.house.duration}</p>
            </div>
          </div>

          <div className={Styles.cardContentProof}>
            <div className={Styles.imageWrapper}>
              {/* // place image file or barcode */}
            </div>
            {book.status === 1 ? (
              <p>Upload payment proof</p>
            ) : book.status === 0 ? null : null}
          </div>
        </div>
        <Table responsive="sm" style={{ marginTop: '30px' }}>
          <thead>
            <tr>
              <th>No</th>
              <th>Fullname</th>
              <th>Gender</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-secondary">1</td>
              <td className="text-secondary">{book.user.fullname}</td>
              <td className="text-secondary">{book.user.gender}</td>
              <td className="text-secondary">{book.user.phoneNumber}</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <span style={{ paddingRight: '12px' }}>Long time rent</span>
                <span style={{ paddingRight: '72px' }}>:</span>
                {`1 ${book.house.duration}`}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <span style={{ paddingRight: '85px' }}>Total</span>
                <span style={{ paddingRight: '10px' }}>:</span>
                <span style={{ color: book.status !== 3 && 'red' }}>
                  Rp. {book.house.price}
                </span>
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <span className={Styles.button}>
        {type === 'booking' && (
          <ButtonReuse
            className="font-weight-bold"
            style={{
              backgroundColor: '#5A57AB',
              color: ' white',
              padding: '10px 65px',
            }}
            onClick={() => setshow(true)}
            disabled={book.status !== 1}
          >
            PAY
          </ButtonReuse>
        )}
      </span>
      <Modal
        show={show}
        onHide={() => setshow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="text-center">
          Pembayaran Anda Akan di Konfirmasi dalam 1 x 24 Jam Untuk melihat
          pesanan Klik
          <span
            style={{
              borderBottom: '1px solid black',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            className="mx-1"
            onClick={handlePushTo}
          >
            Disini
          </span>
          Terimakasih
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomCardBox;
