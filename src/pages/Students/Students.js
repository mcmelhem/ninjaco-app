import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../hooks/AuthProvider";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import StudentsDataTable from "./StudentsDataTable";
import './students.scss';
const Students = () => {
  return (
    <div className="container-fluid">
      <Row className="h-100">
        <div className="main p-0 w-100">
       
        </div>
        <div className='wrapper-content h-100'>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className='p-2'>
              <button className='btn-primary btn m-1'><FontAwesomeIcon icon={faPlus} />Add Student  </button>
              <StudentsDataTable></StudentsDataTable>
            </Col>
          </Row>
          <Row>

          </Row>
        </div>
      </Row>
    </div>
  );

}

export default Students;