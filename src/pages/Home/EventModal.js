import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';
import SearchableSelection from '../../components/SearchableSelection/SearchableDropDown';
const EventsModal = ({ isOpen, onClose, title }) => {

    const [formData, setFormData] = useState({
        location: '',
        date: new Date(),
        instructor: '',
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

    // Step 4: Clear the form data
    const clearForm = () => {
        setFormData({
            location: '',
            date: new Date(),
            instructor: '',
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
                            <Form.Group className="mb-3" controlId="location">
                            <SearchableSelection defaultOption="Location" className="form-control-noborder form-control"></SearchableSelection>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="date">
                                <DatePicker
                                    className="form-control-noborder form-control"
                                    placeholderText="dd/mm/yy"
                                    selected={formData.date}
                                    onChange={(date) => setFormData({ ...formData, date })}  
                                />
                            </Form.Group>

                         
                            <Form.Group className="mb-3" controlId="instructor">
                                <DropDown
                                    defaultOption="Instructor"
                                    className="form-control-noborder form-control"
                                    id="instructor"
                                    getAPIData={false}
                                    strAPIName=""
                                    onSelect={(selectedValue) => setFormData({ ...formData, instructor: selectedValue })}  
                                />
                            </Form.Group>

                        
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Control
                                    className="form-control-noborder"
                                    as="textarea"
                                    name="description" 
                                    placeholder="Description"
                                    rows={3}
                                    value={formData.description}
                                    onChange={handleChange}
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

export default EventsModal;
