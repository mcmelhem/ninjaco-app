import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';

import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const AttendanceModal = ({ isOpen, onClose, title }) => {

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
    const [students, setstudents] = useState([//get from grid
        { id: 1, checkbox: false, name: 'Jad', sessionNum: '1', activity: 'Milo', note: '' },
        { id: 2, checkbox: false, name: 'Jad', sessionNum: '1', activity: 'Milo', note: '' },
        { id: 3, checkbox: false, name: 'Jad', sessionNum: '1', activity: 'Milo', note: '' }
    ]);
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
    const handleCheckboxChange = (id) => {
        const updatedstudents = students.map(item =>
            item.id === id ? { ...item, checkbox: !item.checkbox } : item
        );
        setstudents(updatedstudents);
    };

    const handleInputChange = (id, inputName, value) => {
        const updatedstudents = students.map(item =>
            item.id === id ? { ...item, [inputName]: value } : item
        );
        setstudents(updatedstudents);
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

                            <span>Select the students that attended</span>
                            <div>
                                <ul className='students-list'>
                                    {students.map(item => (
                                        <li key={item.id} style={{ marginBottom: '10px' }}>
                                            <Row>
                                                <Col sm="10" md="9" lg="1">
                                                    <Form.Check
                                                        type="checkbox"
                                                        checked={item.checkbox}
                                                        onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </Col>
                                                <Col sm="10" md="9" lg="3">
                                                    <Form.Group className="mb-3" controlId="name">
                                                        <Form.Control
                                                            className="form-control-noborder"
                                                            type="text"
                                                            readOnly
                                                            placeholder="Name"
                                                            value={item.name}
                                                          
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm="10" md="9" lg="2">
                                                    <Form.Group className="mb-3" controlId="session">
                                                        <Form.Control
                                                            className="form-control-noborder"
                                                            type="text"
                                                            placeholder="session#"
                                                            value={item.sessionNum}
                                                            onChange={(e) => handleInputChange(item.id, 'sessionnum', e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm="10" md="9" lg="3">
                                                    <Form.Group className="mb-3" controlId= 'activity'>
                                                        <Form.Control
                                                            className="form-control-noborder"
                                                            type="text"
                                                            placeholder="robot"
                                                            value={item.activity}
                                                            onChange={(e) => handleInputChange(item.id, 'activity', e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col sm="10" md="9" lg="3">
                                                    <Form.Group className="mb-3" controlId='note'>
                                                        <Form.Control
                                                            className="form-control-noborder"
                                                            type="text"
                                                            placeholder="note"
                                                            value={item.note}
                                                            onChange={(e) => handleInputChange(item.id, 'note', e.target.value)}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </li>
                                    ))}
                                </ul>
                            </div>

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

export default AttendanceModal;
