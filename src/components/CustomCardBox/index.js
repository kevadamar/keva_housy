import { useContext, useEffect, useRef, useState } from 'react';
import { Container, Modal, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode.react';

import ButtonReuse from '../utils/ButtonReuse';

import brandIcon from '../../assets/images/brand.svg';
import ellipseStart from '../../assets/images/ellipse-start.svg';
import verticalLine from '../../assets/images/line-icon.svg';
import ellipseEnd from '../../assets/images/ellipse-end.svg';

import Styles from './CustomCard.module.css';
import { UserContext } from '../../contexts/UserContext';
import { API } from '../../config';
import { useMutation } from 'react-query';
import { io } from 'socket.io-client';
import { getDataLocalStorage } from '../../helper';

const CustomCardBox = ({ book, pushTo, type }) => {
  const router = useHistory();
  const socket = useRef();

  const { state: stateUser } = useContext(UserContext);

  const [show, setshow] = useState(false);
  const [file, setFile] = useState({ file: '', fileUrl: '' });
  const [changeFile, setChangeFile] = useState(false);

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

    return `${day[dayNumber]}, ${new Date(date).getDate() - 1} ${
      month[monthNumber]
    } ${new Date(date).getFullYear()}`;
  };

  const formatDate = (date) => {
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

  const handleApproval = async (data) => {
    try {
      const response = await API.patch(`/order/${book.id}/status`, data);
      if (response.status !== 200) {
        throw new Error(`Error ${response.status}`);
      }
      return response.data.message;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const handlePayment = async ({ data, ownerId }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const response = await API.post(`/order`, data, config);
      console.log('owner id', ownerId);
      if (response.status !== 201) {
        throw new Error(`Error ${response.status}`);
      }
      return ownerId;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const handleCancelBooking = async (data) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await API.delete(`/booking/${data}`, config);
      console.log(response);
      if (response.status !== 200) {
        throw new Error(`Error ${response.status}`);
      }
      return response.data.message;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const mutationApproval = useMutation(handleApproval, {
    onSuccess: async ({ data }) => {
      console.log(`data`, data);
      router.go(0);
    },
    onError: async () => {
      console.log('error');
    },
  });

  const mutationPayment = useMutation(handlePayment, {
    onSuccess: async (data) => {
      console.log(`data pay`, data);
      socket.current.emit('send-notification', data);
      setshow(true);
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const mutationCancelBooking = useMutation(handleCancelBooking, {
    onSuccess: async ({ data }) => {
      console.log(`data`, data);
      router.go(0);
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const handlePushTo = () => {
    router.push(pushTo);
  };

  const handleApprove = () => {
    mutationApproval.mutate({ status: 3 });
  };

  const handleCancel = () => {
    mutationApproval.mutate({ status: 0 });
  };

  const onPay = () => {
    const {
      checkin,
      checkout,
      total,
      house: {
        id: house_id,
        owner: { id: owner_id },
      },
      id,
    } = book;

    const formData = new FormData();
    formData.append('checkin', checkin);
    formData.append('checkout', checkout);
    formData.append('total', total);
    formData.append('house_id', house_id);
    formData.append('status', 2);
    formData.append('booking_id', id);
    formData.append('imageFile', file.file, file.file.name);

    mutationPayment.mutate({ data: formData, ownerId: owner_id });
  };

  const onCancel = () => {
    mutationCancelBooking.mutate(book.id);
  };

  useEffect(() => {
    socket.current = io('http://localhost:5000', {
      transports: ['websocket'],
      query: { token: getDataLocalStorage({ key: 'token' }) },
    });
    return () => socket.current.disconnect();
  }, []);

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
            <p className={Styles.bookingDate}>{formatDate(book.createdAt)}</p>
          </div>
        </div>
        <div className={Styles.cardContent}>
          <div className={Styles.cardContentName}>
            <h2>{book.house.name}</h2>
            <p className={Styles.houseAddress}>
              {book.house.address}, {book.house.city.name}
            </p>
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
                <p>{formatDateOrder(book.checkin)}</p>
              </div>

              <div className={Styles.checkoutWrapper}>
                <h3>Check-out</h3>
                <p>{formatDateOrder(book.checkout)}</p>
              </div>
            </div>
          </div>

          <div className={Styles.cardContentVariant}>
            <div className={Styles.amenities}>
              <h3>Amenities</h3>
              <div>
                {book.house.amenities?.map((amenities) => (
                  <p>{amenities}</p>
                ))}
              </div>
            </div>

            <div className={Styles.duration}>
              <h3>Type of Rent</h3>
              <p>{book.house.typeRent}</p>
            </div>
          </div>

          <div className={Styles.cardContentProof}>
            {book.status === 1 ? (
              <>
                <div
                  className={`${Styles.imageWrapper} ${Styles.imageWrapperBooking}`}
                >
                  {changeFile ? (
                    <img
                      style={{ objectFit: 'contain', width: '100%' }}
                      src={file.fileUrl}
                      alt="proof"
                    />
                  ) : (
                    ''
                  )}
                </div>
                {!changeFile && (
                  <ButtonReuse
                    className="font-weight-bold"
                    style={{
                      backgroundColor: '#5A57AB',
                      color: ' white',
                      marginTop: '5px',
                      padding: '0 40px',
                    }}
                  >
                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                      <span>Choose</span>
                    </label>
                    <input
                      id="fileInput"
                      style={{ display: 'none' }}
                      type="file"
                      className={Styles.fileInput}
                      onChange={(e) => {
                        setFile({
                          file: e.target.files[0],
                          fileUrl: URL.createObjectURL(e.target.files[0]),
                        });
                        setChangeFile(true);
                      }}
                    />
                  </ButtonReuse>
                )}
                {file.file && (
                  <ButtonReuse
                    className="font-weight-bold"
                    style={{
                      color: ' white',
                      marginTop: '5px',
                      padding: '3px 43px',
                      cursor: 'pointer',
                    }}
                    variant="warning"
                    onClick={() => {
                      setFile({ file: '', fileUrl: '' });
                      setChangeFile(false);
                    }}
                  >
                    <span>Delete</span>
                  </ButtonReuse>
                )}
              </>
            ) : (
              <>
                <div className={Styles.imageWrapper}>
                  <QRCode value="https://kevadamargalih.netlify.app/" />
                </div>
              </>
            )}
          </div>
        </div>
        <Table responsive="sm" style={{ marginTop: '50px' }}>
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
              <td className="text-secondary">+62{book.user.phone_number}</td>
              <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                <span style={{ paddingRight: '12px' }}>Long time rent</span>
                <span
                  style={{
                    paddingRight:
                      book.house.typeRent === 'Year'
                        ? '78px'
                        : book.house.typeRent === 'Month'
                        ? '63px'
                        : '83px',
                  }}
                >
                  :
                </span>
                {`${book.house.typeRent}`}
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
        {type === 'booking' && stateUser.user.role !== 'owner' && (
          <>
            <ButtonReuse
              className="font-weight-bold mr-2"
              style={{
                color: ' white',
                padding: '10px 45px',
              }}
              variant="danger"
              onClick={onCancel}
            >
              CANCEL
            </ButtonReuse>
            <ButtonReuse
              className="font-weight-bold"
              style={{
                backgroundColor: '#5A57AB',
                color: ' white',
                padding: '10px 65px',
              }}
              onClick={onPay}
              disabled={!file.file}
            >
              PAY
            </ButtonReuse>
          </>
        )}
        {stateUser.user.role === 'owner' && book.status === 2 && (
          <>
            <ButtonReuse
              className="font-weight-bold mr-4"
              onClick={() => handleCancel()}
              variant="danger"
            >
              CANCEL
            </ButtonReuse>
            <ButtonReuse
              className="font-weight-bold"
              onClick={() => handleApprove()}
              variant="success"
            >
              APPROVE
            </ButtonReuse>
          </>
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
