import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AttendanceTable from './AttendanceTable';
import StudentAddModal from './StudentAddModal';
import SectionModal from './SectionModal';
import AttendanceModal from './AttendanceModal';
import SearchableSelection from '../../components/SearchableSelection/SearchableDropDown';
import "react-datepicker/dist/react-datepicker.css";
import './attendance.scss';

const Attendance = () => {
  const [isStudentAttendanceModalOpen, setisStudentAttendanceModalOpen] = useState(false);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [sessions, setSessions] = useState([]);
  const addSection = (blnShowModal) => {
    setModalTitle('Add Section');
    setIsSectionModalOpen(blnShowModal);
  }
  const addSectionData = (newSession) => {
    const day = newSession.day.name;
    const time = newSession.time;
    newSession.time = day + ' @' + time;
    setSessions((prevSessions) => [
      ...prevSessions,
      { ...newSession, id: prevSessions.length + 1 }
    ]);
  };

  const addStudent = (blnShowModal) => {
    setModalTitle('Add Student');
    setisStudentAttendanceModalOpen(blnShowModal);
  }
  const addAttendance = (blnShowModal) => {
    setModalTitle('Add Attendance');
    setIsAttendanceModalOpen(blnShowModal);
  }

  const handleCheckboxChange = (id) => {
    
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
              <Col sm="10" md="9" lg="3">
                <button className='btn-add btn' onClick={() => addSection(true)}>
                <FontAwesomeIcon icon={faPlus} /> Add Section</button>
                <SectionModal isOpen={isSectionModalOpen}
                  onClose={() => addSection(false)}
                  addSectionData={addSectionData}
                  title={modalTitle}>
                </SectionModal>
              </Col>
            </Form.Group>
            <button className='btn-add btn m-1' onClick={() => addStudent(true)}><FontAwesomeIcon icon={faPlus} /> Add Student</button>
            <StudentAddModal isOpen={isStudentAttendanceModalOpen} onClose={() => addStudent(false)} title={modalTitle}> </StudentAddModal>
            <button className='btn-add btn m-1' onClick={() => addAttendance(true)}><FontAwesomeIcon icon={faPlus} /> Add Attendance</button>
            <AttendanceModal isOpen={isAttendanceModalOpen} onClose={() => addAttendance(false)} title={modalTitle}> </AttendanceModal>
          </Col>
        </Row>
        <div className='sections-wrapper'>
          <div className='section-div m-1'>
             <Form.Label controlId="section0">Monday @5:00PM</Form.Label>
          </div>

          <AttendanceTable sessionId={0} example={true} />
          {sessions.map((session) => (
            <React.Fragment key={session.id}>
              <div className='section-div m-1'>
                <Form.Group controlId={session.id}>
                  <Form.Label>{session.time} </Form.Label>
                </Form.Group>
              </div>

              <AttendanceTable sessionId={session.id} example={false} /> {/* Passing sessionId as a prop */}
            </React.Fragment>
          ))}

        </div>
      </div>
    </div>
  );

}

export default Attendance;