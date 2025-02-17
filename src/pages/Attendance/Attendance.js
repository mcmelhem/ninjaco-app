import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AttendanceTable from './AttendanceTable';
import StudentAttendance from './StudentAttendanceModal';
import SectionModal from './SectionModal';
import AttendanceModal from './AttendanceModal';
import SearchableSelection from '../../components/SearchableSelection/SearchableDropDown';
import "react-datepicker/dist/react-datepicker.css";
import './attendance.scss';

const Attendance = () => {
  const [isStudentAttendanceModalOpen, setisStudentAttendanceModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [sessions, setSessions] = useState([
    { id: '1', time: 'Monday @ 4pm' },
    { id: '2', time: 'Monday @ 5pm' }
  ]);
  const [modalTitle, setModalTitle] = useState('');

  const addStudent = (blnShowModal) => {
    setModalTitle('Add Student');
    setisStudentAttendanceModalOpen(blnShowModal);
  }
  const addAttendance = (blnShowModal) => {
    setModalTitle('Add Attendance');
    setIsAttendanceModalOpen(blnShowModal);
  }

  const addSection = (blnShowModal) => {
    setModalTitle('Add Section');
    setIsSectionModalOpen(blnShowModal);
  }
  return (
    <div className="container-fluid">
      <div className='wrapper-content h-100'>
        <Row style={{ width: "70%" }}>
          <Col xs={12} sm={12} md={12} lg={12} className='p-2'>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2" lg="2">Choose Center</Form.Label>
              <Col sm="10" md="9" lg="7">
                <SearchableSelection defaultOption="Center"></SearchableSelection>
              </Col>
            </Form.Group>
            <button className='btn-add btn m-1' onClick={() => addStudent(true)}><FontAwesomeIcon icon={faPlus} /> Add Student</button>
            <StudentAttendance isOpen={isStudentAttendanceModalOpen} onClose={() => addStudent(false)} title={modalTitle}> </StudentAttendance>
            <button className='btn-add btn m-1' onClick={() => addAttendance(true)}><FontAwesomeIcon icon={faPlus} /> Add Attendance</button>
            <AttendanceModal isOpen={isAttendanceModalOpen} onClose={() => addAttendance(false)} title={modalTitle}> </AttendanceModal>
            <button className='btn-add btn m-1' onClick={() => addSection(true)}><FontAwesomeIcon icon={faPlus} /> Add Section</button>
            <SectionModal isOpen={isSectionModalOpen} onClose={() => addSection(false)} title={modalTitle}></SectionModal>
          </Col>
        </Row>
        <div className='sections-wrapper'>
          <div className='sections-wrapper'>
            {sessions.map((session) => (
              <React.Fragment key={session.id}>
                <button className='btn-add btn m-2' id={session.id}>
                  {session.time} {/* Assuming the API returns a "time" field */}
                </button>
                <AttendanceTable sessionId={session.id} /> {/* Passing sessionId as a prop */}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Attendance;