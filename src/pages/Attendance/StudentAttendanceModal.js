import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';

const StudentAttendance = ({ isOpen, onClose, title }) => {

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
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Control
                  type="text"
                  name="firstname"
                  className="form-control-noborder"
                  value={formData.firstname}
                  onChange={handleChange}
                  placeholder="First Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastname">
                <Form.Control
                  type="text"
                  name="lastname"
                  className="form-control-noborder"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Last Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="course">
                <DropDown
                  defaultOption="Course"
                  className="form-control-noborder form-control"
                  id="course"
                  getAPIData={false}
                  strAPIName=""
                  onSelect={(selectedValue) => setFormData({ ...formData, course: selectedValue })}  // Update instructor in formData
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="package">
              <DropDown
                  defaultOption="Package"
                  className="form-control-noborder form-control"
                  id="course"
                  getAPIData={false}
                  strAPIName=""
                  onSelect={(selectedValue) => setFormData({ ...formData, package: selectedValue })}  // Update instructor in formData
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="level">
                <Form.Control
                  type="text"
                  name="level"
                  className="form-control-noborder"
                  value={formData.level}
                  onChange={handleChange}
                  placeholder="Level"
                />
              </Form.Group>

              <div className='seperator'></div>
              <Form.Group className="mb-3" controlId="amount">
                <Form.Control
                  type="text"
                  name="amount"
                   className="form-control-noborder"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="parent">
                <Form.Control
                  type="text"
                  className="form-control-noborder"
                  name="parent"
                  value={formData.parent}
                  onChange={handleChange}
                  placeholder="Parent Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Control
                  type="text"
                  name="phone"
                  className="form-control-noborder"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
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

export default StudentAttendance;
