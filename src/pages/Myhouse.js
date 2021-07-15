import { useContext, useEffect, useState } from 'react';
import { Container, Table, Modal } from 'react-bootstrap';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';

import ButtonReuse from '../components/utils/ButtonReuse';
import Loader from '../components/utils/Loader';
import { API } from '../config';
import { SearchContext } from '../contexts/SearchContext';
import { HIDE, SHOW } from '../contexts/SearchContext/action';
import { UserContext } from '../contexts/UserContext';

const MyHouse = () => {
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

  const handleDelete = (idOrder) => {
    setIdOrder(idOrder);
    setShow(true);
  };

  const handleResetCache = async () => {
    console.log('remove cache');
    await queryClient.removeQueries(['owner-houses', 1], { exact: true });
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
      const response = await API.get(`owner/houses?page=${page}`);

      // console.log(response);
      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      setCountData(response.data.countData);
      return response.data.data;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  };

  const postData = async (id) => {
    try {
      const response = await API.delete(`house/${id}`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.message;
    } catch (error) {
      throw new Error('Interval Server Error');
    }
  };

  const { isLoading, data, isError, isSuccess, refetch } = useQuery(
    ['owner-houses', page],
    () => loadData(page),
  );

  const mutation = useMutation(postData, {
    onSuccess: async ({ data }) => {
      console.log(`data delete house`, data);
      setShow(false);
      refetch();
    },
    onError: async (error) => {
      console.log('error', error);
    },
  });

  const handleClickedOk = () => {
    mutation.mutate(idOrder);
  };

  return (
    <Container
      fluid
      className="bg-identity"
      style={{ height: isSuccess && data.length <= 10 && '87vh' }}
    >
      <Container className="py-5">
        <Container className="d-flex justify-content-between mb-2">
          <h4>My Houses</h4>
          <ButtonReuse onClick={() => router.push('/owner/add')}>
            Add House
          </ButtonReuse>
        </Container>
        {isSuccess && data?.length > 0 && (
          <Table striped responsive="md" style={{ textAlign: 'center' }}>
            <thead style={{ backgroundColor: 'white' }}>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>House Name</th>
                <th>Price</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 1 && 'white',
                  }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <img
                      width="50px"
                      height="50px"
                      src={item.image}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <i
                      className="fa fa-eye"
                      style={{ color: '#2FC5F7', cursor: 'pointer' }}
                      onClick={() =>
                        router.push(`/owner/my-house/detail/${item.id}`)
                      }
                    ></i>
                  </td>
                  <td>
                    <i
                      className="fa fa-trash-o"
                      style={{ color: '#2FC5F7', cursor: 'pointer' }}
                      onClick={() => handleDelete(item.id)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {isLoading && <Loader />}
        {isError && <h2>There was an error processing your request....</h2>}
        {isSuccess && data?.length === 0 && <h2>No Data Your House</h2>}
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
            <ButtonReuse
              onClick={nextPage}
              disabled={
                data?.length <= 4 || (countData > 0 && countData === 5)
                  ? true
                  : false
              }
            >
              Next
            </ButtonReuse>
          </Container>
        )}

        {/* dialog delete */}
        {show && (
          <Modal show={show} backdrop="static" keyboard={false} centered>
            <Modal.Body>Are you sure deleted this data ?</Modal.Body>
            <Modal.Footer>
              <ButtonReuse variant="danger" onClick={() => setShow(false)}>
                CANCEL
              </ButtonReuse>
              <ButtonReuse variant="primary" onClick={handleClickedOk}>
                OK
              </ButtonReuse>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </Container>
  );
};

export default MyHouse;
