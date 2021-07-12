import { Modal } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { API } from '../../config';
import CustomCardBox from '../CustomCardBox';

const ModalApproval = ({ id, show, setshow }) => {
  const { data, isSuccess } = useQuery(`order-${id}`, async () => {
    try {
      const response = await API.get(`order/${id}`);

      if (response.status !== 200) {
        throw new Error('An error has occured');
      }
      return response.data.data;
    } catch (error) {
      console.log(`error`, error)
      throw new Error('Internal Server Error');
    }
  });

  return (
    <Modal
      show={show}
      onHide={setshow}
      backdrop="static"
      centered
      dialogClassName="modal-90w"
      aria-labelledby="modal approval"
    >
      {isSuccess && (
        <>
          <Modal.Header
            closeButton
            style={{ borderBottom: 'none', color: 'red' }}
          ></Modal.Header>
          <Modal.Body>
            <CustomCardBox book={data} type="booking" />
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ModalApproval;
