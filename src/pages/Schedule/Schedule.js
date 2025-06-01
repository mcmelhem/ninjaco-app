import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Calendar from './Calendar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './schedule.scss';

const Attendance = () => {
 
  return (
    <div className="container-fluid">
      <Row className="h-100">
        <div className='wrapper-content h-100'>
         <Calendar></Calendar>
        </div>
      </Row>
    </div>
  );

}

export default Attendance;