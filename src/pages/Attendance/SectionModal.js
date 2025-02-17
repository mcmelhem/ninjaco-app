import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const SectionModal = ({ isOpen, onClose, title }) => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        course: '',
        package: '',
        level: '',
        parent: '',
        phone: '',
        amount: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

    };
    const clearForm = () => {
        setFormData({
            firstname: '',
            lastname: '',
            course: '',
            package: '',
            level: '',
            parent: '',
            phone: '',
            amount: ''
        });
    };
    return (
        <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <Form >
                            <Form.Group className="mb-3" controlId="date">
                                <DatePicker
                                    className="form-control-noborder form-control"
                                    placeholderText="dd/mm/yy"
                                    selected={formData.date}
                                    onChange={(date) => setFormData({ ...formData, date })}  // Update the date in formData
                                />
                            </Form.Group>

                      

                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='saveBtn' onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" className='cancelBtn' onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SectionModal;
