import { Modal, Button } from 'react-bootstrap'
import './CreateModal.css'

function CreateModal(ContainedComponent: any) {

    return function CustomModal(props: any) {
        return (
            <Modal
                {...props}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ContainedComponent {...props}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default CreateModal
