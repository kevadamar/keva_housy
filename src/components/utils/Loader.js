import { Spinner } from "react-bootstrap"
import ButtonReuse from "./ButtonReuse"

const Loader = () => {
    return (
        <>
            <span className="d-flex flex-column">
              <ButtonReuse
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'black',
                }}
                disabled={true}
              >
                <Spinner
                  as="span"
                  animation="grow"
                  size="md"
                  role="status"
                  aria-hidden="true"
                  color="black"
                />
                <h3>Loading...</h3>
              </ButtonReuse>
            </span>
        </>
    )
}

export default Loader
