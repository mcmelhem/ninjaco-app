import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const IncomeExpensesModal = ({ isOpen, onClose, title }) => {
    const [formData, setFormData] = useState({
        amount: '',
        date: new Date(),
        category: '',
        subcategory: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = () => {
        console.log("Form Data: ", formData);

        clearForm();
        onClose();
    };


    const clearForm = () => {
        setFormData({
            amount: '',
            date: new Date(),
            category: '',
            subcategory: '',
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


                            <Form.Group className="mb-3" controlId="category">
                                <DropDown
                                    defaultOption="Category"
                                    className="form-control-noborder form-control"
                                    id="category"
                                    getAPIData={true}
                                    strAPIName="GetIncomeSource"
                                    onSelect={(selectedValue) => setFormData({ ...formData, category: selectedValue })}  // Update the category in formData
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="subcategory">
                                <DropDown
                                    defaultOption="Subcategory"
                                    className="form-control-noborder form-control"
                                    id="category"
                                    getAPIData={true}
                                    strAPIName="GetIncomeSource"
                                    onSelect={(selectedValue) => setFormData({ ...formData, subcategory: selectedValue })}  // Update the category in formData
                                />
                            </Form.Group>
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

export default IncomeExpensesModal;
