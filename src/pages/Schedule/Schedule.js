import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Accordion } from 'react-bootstrap';
import Calender from './Calender';
import "react-datepicker/dist/react-datepicker.css";
import 'react-dropdown/style.css';
import TeamSchedule from './TeamSchedule';
const Attendance = () => {
  const [activeKey, setActiveKey] = useState('calender');
  const handleSelect = (eventKey) => {
    setActiveKey(eventKey);
  };
  return (
    <div className="container-fluid">
      <Row className="h-100">
        <div className='wrapper-content h-100 p-0'>
          <Accordion className='p-0' defaultActiveKey={activeKey} activeKey={activeKey} onSelect={handleSelect} alwaysOpen>
            <Accordion.Item eventKey="calender">
              <Accordion.Header>Calender</Accordion.Header>
              <Accordion.Body>
                {activeKey == 'calender' && (<Calender></Calender>)}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="team">
              <Accordion.Header>Team Schedule</Accordion.Header>
              <Accordion.Body>
                
              {activeKey == 'team' && (  <TeamSchedule></TeamSchedule>)}
              
              </Accordion.Body>
            </Accordion.Item >

          </Accordion>
        </div>
      </Row>
    </div>
  );

}

export default Attendance;