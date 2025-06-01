import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import DropDown from '../../components/DropDown/CustomDropDown';

const StudentAddModal = ({ isOpen, onClose, title, addStudentData }) => {
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    package: '',
    level: '',
    parent: '',
    phone: '',
    section: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    /* if (formData.day == '' || formData.time == '') {
         setError('All fields are required!');
         return;
     }*/
    addStudentData(formData);
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      package: '',
      level: '',
      parent: '',
      phone: '',
      section: ''
    });
    onClose();
  };

  const handleCancel = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      package: '',
      level: '',
      parent: '',
      phone: '',
      section: ''
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
              <Form.Group className="mb-3" controlId="firstname">
                <Form.Control
                  type="text"
                  name="firstname"
                  className="form-control-noborder"
                  value={formData.firstname}
                  placeholder="First Name"
                  onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="lastname">
                <Form.Control
                  type="text"
                  name="lastname"
                  className="form-control-noborder"
                  value={formData.lastname}
                  placeholder="Last Name"
                  onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="course">
                <DropDown
                  defaultOption="Course"
                  className="form-control-noborder form-control"
                  id="course"
                  getAPIData={false}
                  strAPIName=""
                  arxData={[{ "id": -1, "name": "course" }]}
                  onSelect={(selectedValue) => setFormData({ ...formData, course: selectedValue })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="package">
                <DropDown
                  defaultOption="Package"
                  className="form-control-noborder form-control"
                  id="package"
                  getAPIData={false}
                  strAPIName=""
                  arxData={[{ "id": -1, "name": "package" }]}
                  onSelect={(selectedValue) => setFormData({ ...formData, package: selectedValue })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="level">
                <Form.Control
                  type="text"
                  name="level"
                  className="form-control-noborder"
                  value={formData.level}
                  placeholder="Level"

                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                />
              </Form.Group>

              <div className='seperator'></div>
              <Form.Group className="mb-3" controlId="section">
                <DropDown
                  defaultOption="Section"
                  className="form-control-noborder form-control"
                  id="section"
                  getAPIData={false}
                  strAPIName=""
                  arxData={[{ "id": -1, "name": "section" }]}
                  onSelect={(selectedValue) => setFormData({ ...formData, section: selectedValue })}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="parent">
                <Form.Control
                  type="text"
                  className="form-control-noborder"
                  name="parent"
                  value={formData.parent}
                  placeholder="Parent Name"
                  onChange={(e) => setFormData({ ...formData, parent: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="phone">
                <Form.Control
                  type="text"
                  name="phone"
                  className="form-control-noborder"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          <Button variant="secondary" className='cancelBtn' onClick={handleCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentAddModal;
