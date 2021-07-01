import { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ModalApproval from '../components/ModalApproval';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';
import { getDataLocalStorage } from '../helper';

const Owner = () => {
  const router = useHistory()

  const { dispatch } = useContext(SearchContext);
  const { state:stateUser } = useContext(UserContext);

  const [payload, setPayload] = useState(null);
  const [show, setShow] = useState(false);
  const [dataOrder, setDataOrder] = useState('');

  const handleClick = (idOrder) => {
    let fromLocal = getDataLocalStorage({ key: 'history' });
    console.log(fromLocal)
    fromLocal = fromLocal.find((data) => data.bookId === idOrder);
    setDataOrder(fromLocal);
    setShow(true);
  };

  const handleOnHide = () => {
    setDataOrder('');
    setShow(false);
  };

  useEffect(() => {
    setPayload(getDataLocalStorage({ key: 'history' }));
    dispatch({ type: HIDE });

    if (stateUser.user.role === 'tenant') {
      router.push('/')
    }

    return () => {
      setPayload(null);
      dispatch({ type: SHOW });
    };
  }, [dispatch]);
  return (
    <Container
      fluid
      className="bg-identity"
      style={{ height: payload && payload.length <= 10 && '87vh' }}
    >
      <Container className="py-5">
        <h4>Incoming Transaction</h4>
        <Table striped responsive="md" style={{ textAlign: 'center' }}>
          <thead style={{ backgroundColor: 'white' }}>
            <tr>
              <th>No</th>
              <th>Users</th>
              <th>House</th>
              <th>Type Of Rent</th>
              <th>Bukti Transfer</th>
              <th>Status Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payload &&
              payload.map((item, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: index % 2 === 1 && 'white' }}
                >
                  <td>{index + 1}</td>
                  <td>{item.user.fullname}</td>
                  <td>{item.houseName}</td>
                  <td>{item.house.duration}</td>
                  <td>Bukti.jpg</td>
                  <td>
                    {item.status === 0 && (
                      <span style={{ color: 'red' }}>Cancel</span>
                    )}
                    {item.status === 1 && (
                      <span style={{ color: 'rgb(181 62 11)' }}>
                        Waiting Payment
                      </span>
                    )}
                    {item.status === 2 && (
                      <span style={{ color: '#F7941E' }}>Pending</span>
                    )}
                    {item.status === 3 && (
                      <p style={{ color: 'green' }}>Approve</p>
                    )}
                  </td>
                  <td>
                    <i
                      className="fa fa-search"
                      style={{ color: '#2FC5F7', cursor: 'pointer' }}
                      onClick={() => handleClick(item.bookId)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <ModalApproval
          show={show}
          setshow={handleOnHide}
          dataOrder={dataOrder}
        />
      </Container>
    </Container>
  );
};

export default Owner;
