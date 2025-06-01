import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const AttendancePaymentModal = ({ rowModify, isOpen, onClose, title }) => {
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        course: rowModify.course,
        package:  rowModify.package,
        discount: ''
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
            date: '',
            amount: '',
            course: '',
            package: '',
            discount: ''
        });
    };
   
    return (
        <>
            <Modal show={isOpen} onHide={onClose} size="lg">
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
                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Control
                                    type="text"
                                    className="form-control-noborder"
                                    name="amount"
                                    value={formData.amount}
                                    placeholder="Amount"
                                    onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="discount">
                                <Form.Control
                                    type="text"
                                    className="form-control-noborder"
                                    name="discount"
                                    value={formData.discount}
                                    placeholder="Discount"
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="course">
                                <DropDown
                                    defaultOption="course"
                                    className="form-control-noborder form-control"
                                    id="seccoursetion"
                                    getAPIData={false}
                                    strAPIName=""
                                    arxData={[{ "id": -1, "name": "course" }]}
                                    onSelect={(selectedValue) => setFormData({ ...formData, course: selectedValue })}
                                />
                            </Form.Group>

                        </Form>
                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button className='saveBtn' onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" className='cancelBtn' onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default AttendancePaymentModal;
