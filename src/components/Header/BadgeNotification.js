import { useContext, useEffect, useRef, useState } from 'react';
import { Badge } from 'react-bootstrap';
import io from 'socket.io-client';
import { UserContext } from '../../contexts/UserContext';
import { getDataLocalStorage } from '../../helper';
import DropdownNotification from '../DropdownNotification';
import ModalApproval from '../ModalApproval';
import ButtonReuse from '../utils/ButtonReuse';
import Styles from './Navbar.module.css';

const BadgeNotification = ({ onClick }) => {
  const socket = useRef();

  const { state: stateUser } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);

  const [show, setShow] = useState(false);

  const [idOrder, setIdOrder] = useState('');

  // state show dropdwon notificaiton
  const [dropdownNotificationShow, setDropdownNotificationShow] =
    useState(false);

  const loadNotifications = () => {
    console.log('load notif');
    socket.current.on('new-notifications', (data) => {
      console.log('data notif = ', data);
      setNotifications(data);
    });
    socket.current.on('connect_error', (err) => {
      console.log('error', err.message); // not authorized
    });
  };

  const handleShow = (id) => {
    setShow(true);
    setIdOrder(id);
    setDropdownNotificationShow(false);
  };

  const handleOnHide = () => {
    setShow(false);
    setIdOrder('');
  };

  useEffect(() => {
    let qObj = {
      token: 'guest',
    };

    if (stateUser.isLogin)
      qObj = {
        token: getDataLocalStorage({ key: 'token' }),
        email: stateUser.user.email,
      };

    socket.current = io.connect('http://localhost:5000', {
      transports: ['websocket'],
      query: qObj,
    });

    loadNotifications();
    return () => socket.current.disconnect();
  }, []);

  return (
    <>
      <ButtonReuse
        variant="transparent"
        style={{
          zIndex: '999',
          padding: '5px',
          width: '60px',
        }}
        onClick={() => setDropdownNotificationShow((current) => !current)}
      >
        <i
          className="fa fa-bell"
          style={{
            color: '#2FC5F7',
            cursor: 'pointer',
            fontSize: '1.3em',
          }}
        ></i>
        <Badge className={Styles.iconBadge}>{notifications?.length}</Badge>
      </ButtonReuse>
      {dropdownNotificationShow && (
        <DropdownNotification
          data={notifications}
          onClick={(id) => handleShow(id)}
        />
      )}
      {show && (
        <ModalApproval show={show} setshow={handleOnHide} id={idOrder} />
      )}
    </>
  );
};

export default BadgeNotification;
