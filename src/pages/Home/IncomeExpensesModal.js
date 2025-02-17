import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const IncomeExpensesModal = ({ isOpen, onClose, title }) => {

    // Step 1: Consolidate form fields into a single state
    const [formData, setFormData] = useState({
        amount: '',
        date: new Date(),
        source: '',
        description: ''
    });

    // Step 2: Handle form input changes and update respective fields in formData
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Step 3: Handle save function and log formData
    const handleSubmit = () => {
        console.log("Form Data: ", formData); // You can send this data to an API

        clearForm();
        onClose();
    };

    // Step 4: Clear the form data after save
    const clearForm = () => {
        setFormData({
            amount: '',
            date: new Date(),
            source: '',
            description: ''
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
                        <Form>
                            {/* Amount Field */}
                            <Form.Group className="mb-3" controlId="amount">
                                <Form.Control
                                    className="form-control-noborder"
                                    type="text"
                                    name="amount"  // Name for the input field
                                    value={formData.amount}
                                    onChange={handleChange}  // Use handleChange for all form fields
                                    placeholder="Amount"
                                />
                            </Form.Group>

                            {/* Date Picker Field */}
                            <Form.Group className="mb-3" controlId="date">
                                <DatePicker
                                    className="form-control-noborder form-control"
                                    placeholderText="dd/mm/yy"
                                    selected={formData.date}
                                    onChange={(date) => setFormData({ ...formData, date })}  // Update the date in formData
                                />
                            </Form.Group>

                            {/* Payment Source Dropdown */}
                            <Form.Group className="mb-3" controlId="source">
                                <DropDown
                                    defaultOption="Source"
                                    className="form-control-noborder form-control"
                                    id="source"
                                    getAPIData={true}
                                    strAPIName="GetIncomeSource"
                                    onSelect={(selectedValue) => setFormData({ ...formData, source: selectedValue })}  // Update the source in formData
                                />
                            </Form.Group>

                            {/* Description Field */}
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control
                                    className="form-control-noborder"
                                    as="textarea"
                                    name="description"  // Name for the input field
                                    placeholder="Description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}  // Use handleChange for all form fields
                                />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* Save Button */}
                    <Button className='saveBtn' onClick={handleSubmit}>
                        Submit
                    </Button>
                    {/* Cancel Button */}
                    <Button variant="secondary" className='cancelBtn' onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default IncomeExpensesModal;
