import React, { useState } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';
import DatePicker from '../../components/Date/CustomDate';

const SectionModal = ({ isOpen, onClose, title, addSectionData }) => {
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        day: '',
        time: ''
    });
    const [students, setstudents] = useState([//get from grid
        { id: 1, checkbox: false, name: 'Jad', sessionNum: '1', activity: 'Milo', note: '' },
        { id: 2, checkbox: false, name: 'Jad', sessionNum: '1', activity: 'Milo', note: '' },
        { id: 3, checkbox: false, name: 'Jad', sessionNum: '1', activity: 'Milo', note: '' }
    ]);
    const handleCheckboxChange = (id) => {
        const updatedstudents = students.map(item =>
            item.id === id ? { ...item, checkbox: !item.checkbox } : item
        );
        setstudents(updatedstudents);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.day == '' || formData.time == '') {
            setError('All fields are required!');
            return;
        }
        addSectionData(formData);
        setFormData({
            day: '',
            time: ''
        });
        onClose();
    };

    const handleCancel = () => {
        setFormData({
            day: '',
            time: '',
            ampm: ''
        });
        setError('');
        onClose();
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
                                <DropDown
                                    defaultOption="Day Of the Week"
                                    className="form-control-noborder form-control"
                                    id="day"
                                    getAPIData={false}
                                    strAPIName=""
                                    arxData={[{ "id": -1, "name": "Day Of the Week" }, { "id": 1, "name": "Monday" }, { "id": 2, "name": "Tuesday" }, { "id": 3, "name": "Wednesday" }, { "id": 4, "name": "Thursday" }, { "id": 5, "name": "Friday" }, { "id": 6, "name": "Saturday" }, { "id": 7, "name": "Sunday" }]}
                                    onSelect={(selectedValue) => setFormData({ ...formData, day: selectedValue })}
                                />


                                <DatePicker
                                    className="form-control-noborder form-control"
                                    placeholderText="dd/mm/yy"
                                    showTime={true}
                                    showDate={false}
                                    selected={""}
                                    onChange={(time) => setFormData({ ...formData, time })}
                                />

                            </Form.Group>
                            {error && <p className="error">{error}</p>} {/* Display error if any */}
                      
                            

                            <span>Select Studens to add to this section</span>
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

                                            </Row>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='saveBtn' onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="secondary" className='cancelBtn' onClick={handleCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SectionModal;
