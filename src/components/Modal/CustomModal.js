import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.scss';
const CustomModal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header >
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>  {children}</Modal.Body>
                <Modal.Footer>
                    <Button  className='saveBtn' onClick={onClose}>
                        Save
                    </Button>
                    <Button variant="secondary" className='cancelBtn' onClick={onClose}>
                        Cancel
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;