import { Modal } from 'react-bootstrap';
import CustomCardBox from '../CustomCardBox';

const ModalApproval = ({ dataOrder, show, setshow }) => {
  return (
    <Modal
      show={show}
      onHide={setshow}
      backdrop="static"
      centered
      aria-labelledby="example-modal-sizes-title-lg"
      size="xl"
    >
      {dataOrder && (
        <>
          <Modal.Header
            closeButton
            style={{ borderBottom: 'none', color: 'red' }}
          ></Modal.Header>
          <Modal.Body className="text-center">
            <CustomCardBox book={dataOrder} type="booking" />
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default ModalApproval;
