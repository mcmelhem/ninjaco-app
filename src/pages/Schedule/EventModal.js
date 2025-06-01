import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import SearchableSelection from '../../components/SearchableSelection/SearchableDropDown';
import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const EventModal = ({ isOpen, onClose, title, addEventData }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        instructor: '',
        type: '',
        startDate: '',
        endDate: '',
        description: '',
        location: ''
    });
   

    const handleSubmit = (e) => {
        e.preventDefault();
        /*if (formData.instructor == '' || formData.startDate == '' || formData.endDate == '' || formData.description == '' || formData.location == '') {
            setError('All fields are required!');
            return;
        }*/
        addEventData(formData);
        setFormData({
            instructor: '',
            type: '',
            startDate: '',
            endDate: '',
            description: '',
            location: ''
        });
        onClose();
    };

    const handleCancel = () => {
        setFormData({
            instructor: '',
            type: '',
            startDate: '',
            endDate: '',
            description: '',
            location: ''
        });
        setError('');
        onClose();
    };

  
    return (
        <>
            <Modal show={isOpen} onHide={onClose} size="lg">
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
                                    onChange={(startDate) => setFormData({ ...formData, startDate })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="date">
                                <DatePicker
                                    className="form-control-noborder form-control"
                                    placeholderText="dd/mm/yy"
                                    selected={formData.date}
                                    onChange={(endDate) => setFormData({ ...formData, endDate })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="instructor">
                                <DropDown
                                    defaultOption="Instructor"
                                    className="form-control-noborder form-control"
                                    id="instructor"
                                    getAPIData={false}
                                    strAPIName=""
                                    arxData={[{ "id": -1, "name": "Instructor" }]}
                                    onSelect={(selectedValue) => setFormData({ ...formData, instructor: selectedValue })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="type">
                                <DropDown
                                    defaultOption="type"
                                    className="form-control-noborder form-control"
                                    id="type"
                                    getAPIData={false}
                                    strAPIName=""
                                    arxData={[{ "id": -1, "name": "type" }]}
                                    onSelect={(selectedValue) => setFormData({ ...formData, type: selectedValue })}
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
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </Form.Group>
                        </Form>

                    </div>
                </Modal.Body >
                <Modal.Footer>
                    <Button className='saveBtn' onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" className='cancelBtn' onClick={handleCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
};

export default EventModal;
