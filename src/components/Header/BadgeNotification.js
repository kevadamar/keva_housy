import { useEffect, useRef, useState } from 'react';
import { Badge } from 'react-bootstrap';
import io from 'socket.io-client';
import { getDataLocalStorage } from '../../helper';
import ButtonReuse from '../utils/ButtonReuse';
import Styles from './Navbar.module.css';

const BadgeNotification = () => {
  const socket = useRef();

  const [notifications, setNotifications] = useState([]);

  const loadNotifications = async () => {
    await socket.current.on('new-notifications', (data) => {
      console.log('data notif = ', data);
      setNotifications(data);
    });
    socket.current.on('connect_error', (err) => {
      console.log('error', err.message); // not authorized
    });
  };

  useEffect(() => {
    socket.current = io.connect('http://localhost:5000', {
      transports: ['websocket'],
      query: { token: getDataLocalStorage({ key: 'token' }) },
    });
    
    loadNotifications();
    return () => socket.current.disconnect();
  }, [notifications]);

  useEffect(() => {
    socket.current.emit('load-notification', 'load notif');
  }, []);

  return (
    <ButtonReuse variant="transparent" style={{ padding: '5px' }}>
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
  );
};

export default BadgeNotification;
