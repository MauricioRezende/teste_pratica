import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios'

const baseURL = 'http://localhost:8090/api'

const ModalDelete = (props) => {
    const {
      buttonLabel,
      className,
      id
    } = props;
  
    const [modal, setModal] = useState(false);
  
    const toggle = () => setModal(!modal);

    const del = () => {
        axios
            .put(baseURL +  '/technician/' + id, {'status' : 'deleted', 'id' : id})
            .then(() => {
                setModal(!modal);
                props.func()
            })
    }
  
    return (
        <div>
        <Button outline  color='danger' size='sm' onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>Delete technician {props.technician}</ModalHeader>
                <ModalBody>
                    Do you really want to delete?
                </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={del}>Delete</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}

export default ModalDelete