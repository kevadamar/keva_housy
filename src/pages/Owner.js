import { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { QueryClient, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import ModalApproval from '../components/ModalApproval';
import ButtonReuse from '../components/utils/ButtonReuse';
import Loader from '../components/utils/Loader';
import { API } from '../config';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';

const Owner = () => {
  const router = useHistory();
  const queryClient = new QueryClient();

  const { dispatch } = useContext(SearchContext);
  const { state: stateUser } = useContext(UserContext);

  const [show, setShow] = useState(false);
  const [idOrder, setIdOrder] = useState('');

  const [page, setPage] = useState(1);
  const [countData, setCountData] = useState(0);

  const nextPage = () => {
    setPage((old) => old + 1);
  };
  const previousPage = () => {
    setPage((old) => old - 1);
  };

  const handleClick = (idOrder) => {
    setIdOrder(idOrder);
    setShow(true);
  };

  const handleOnHide = () => {
    setIdOrder('');
    setShow(false);
  };

  const handleResetCache = async () => {
    console.log('remove cache')
    await queryClient.removeQueries(['orders',1], { exact: true });
  };

  useEffect(() => {
    dispatch({ type: HIDE });

    if (stateUser.user.role === 'tenant') {
      router.push('/');
    }

    return () => {
      dispatch({ type: SHOW });
      handleResetCache();
    };
  }, []);

  const loadData = async (page = 1) => {
    try {
      const response = await API.get(`orders?page=${page}`);
      
      // console.log(response);
      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      setCountData(response.data.countData)
      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const { isLoading, data, isError, isSuccess } = useQuery(
    ['orders', page],
    () => loadData(page),
    // { staleTime: 100000 },
  );

  return (
    <Container
      fluid
      className="bg-identity"
      style={{ height: isSuccess && data.length <= 10 && '87vh' }}
    >
      <Container className="py-5">
        <h4>Incoming Transaction</h4>
        {isSuccess && data?.length > 0 && (
          <Table
            striped
            responsive="md"
            style={{ textAlign: 'center', height: '400px' }}
          >
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
              {data?.map((item, index) => (
                <tr
                  key={index}
                  style={{ backgroundColor: index % 2 === 1 && 'white' }}
                >
                  <td>{index + 1}</td>
                  <td>{item.user.fullname}</td>
                  <td>{item.house.name}</td>
                  <td>{item.house.typeRent}</td>
                  <td>
                    <a href={item.attachment} rel="noreferrer" target="_blank">
                      Show Proof
                    </a>
                  </td>
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
                      onClick={() => handleClick(item.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {isLoading && <Loader />}
        {isError && <h2>There was an error processing your request....</h2>}
        {isSuccess && data?.length === 0 && <h2>No Data Transaction</h2>}
        {isSuccess && data?.length > 0 && (
          <Container fluid>
            <div></div>
            <ButtonReuse
              onClick={previousPage}
              disabled={page === 1 ? true : false}
            >
              Previous
            </ButtonReuse>
            <span className="px-2">{page}</span>
            <ButtonReuse onClick={nextPage} disabled={data?.length <= 4 || (countData > 0 && countData === 5)  ? true : false}>Next</ButtonReuse>
          </Container>
        )}
        {show && (
          <ModalApproval show={show} setshow={handleOnHide} id={idOrder} />
        )}
      </Container>
    </Container>
  );
};

export default Owner;
