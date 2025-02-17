import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../hooks/AuthProvider";
import { Row, Col, Button } from 'react-bootstrap';
import CustomNavbar from "../../components/Navbar/CustomNavbar";
import Accordion from 'react-bootstrap/Accordion';
import TreeTable from '../../components/Tables/TreeTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';




const HomeCenter = () => {
  const auth = useAuth();

  const showAddIncome = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("showincome")

  };
  const showAddExpense = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("showincome")

  };
  const showMore = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("showincome")

  };

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const todaysDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });

  return (

    <div className="container-fluid">
      <Row className="h-100">
     
        <Accordion className='p-0' defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0" >
            <Accordion.Header>Dashboard</Accordion.Header>
            <Accordion.Body>
              <div className='wrapper-content h-100'>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
                    <div className='col-first'>
                      <div className="container-fluid mt-3">
                        <div className="card card-rounded card-light-color">
                          <div className="card-statistics">
                            <div className="img-square-wrapper m-2">
                              <img src={require(`../../Images/icons/people.png`)} width="40" height="40" alt="Logo" />
                            </div>
                            <div className="card-statistics-content m-2">
                              <span className="font-size-lg card-statistics-value">12</span>
                              <span className="card-text"> Instructor Assigned </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
                    <div className='col-second'>
                      <div className="container-fluid mt-3">
                        <div className="card card-rounded card-light-color">
                          <div className="card-statistics">
                            <div className="img-square-wrapper m-2">
                              <img src={require(`../../Images/icons/robot.png`)} width="40" height="40" alt="Logo" />
                            </div>
                            <div className="card-statistics-content m-2">
                              <span className="font-size-lg card-statistics-value">1,230</span>
                              <span className="card-text"> ACTIVE STUDENTS </span>
                              <div className='students-progress'>
                                <span>New </span>
                                <div className="progress">
                                  <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <span>33% </span>
                              </div>

                              <div className='students-progress'>
                                <span>New </span>
                                <div className="progress">
                                  <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <span>33% </span>
                              </div>


                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
                    <div className='col-third'>
                      <div className="container-fluid mt-3">
                        <div className="card card-rounded card-light-color">
                          <div className="card-statistics">
                            <div className="img-square-wrapper m-2">
                              <img src={require(`../../Images/icons/people.png`)} width="40" height="40" alt="Logo" />
                            </div>
                            <div className="card-statistics-content m-2">
                              <span className="card-text"> Monday </span>
                              <span className="card-text"> Tuesday </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
                    <div className='col-first'>
                      <div className="container-fluid mt-3">
                        <div className='studentstatus'>
                          <div className='card card-rounded card-main-color'>
                            <div className="card-title">
                              <div className="card-balance m-2">
                                <div className='balance-title'>
                                  <span className='font-size-lg'>Students Status</span>

                                </div>

                              </div>
                            </div>
                            <div className="m-2">
                              <ul className='list-items'>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
                    <div className='col-second'>
                      <div className="container-fluid mt-3">
                        <div className='balance'>
                          <div className='card card-rounded card-main-color'>
                            <div className="card-title">
                              <div className="card-balance m-2">
                                <div className='balance-title'>
                                  <span className='font-size-lg'>Balance</span>
                                  <span className='font-size-sm'>{currentMonth}</span>
                                </div>
                                <div className='balance-insights'>
                                  <span className='balance-value'>+2.00%</span>
                                  <span className='balance-month font-size-sm'>since last month</span>
                                </div>
                              </div>
                            </div>
                            <div className="m-2">
                              <ul className='list-items'>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>

                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
                    <div className='col-second'>
                      <div className="container-fluid mt-3">
                        <div className='balance'>
                          <div className='card card-rounded card-main-color'>
                            <div className="card-title">
                              <div className="card-balance m-2">
                                <div className='balance-title'>
                                  <span className='font-size-lg'>Ninjaco Payment</span>

                                </div>

                              </div>
                            </div>
                            <div className="m-2">
                              <ul className='list-items'>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>

                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                                <li >
                                  <div className="row" >
                                    <div className="col-3">
                                      <span>
                                        Jad Daoud
                                      </span>
                                    </div>
                                    <div className="col-9">
                                      <span>
                                        Needs Certificate
                                      </span>
                                    </div>

                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

              </div >
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Attendance</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className='p-2'>
                  <button className='btn-primary btn m-1'><FontAwesomeIcon icon={faPlus}/>Add Student  </button> 
                  <button className='btn-primary btn m-1'><FontAwesomeIcon icon={faPlus}/>Add Attendees</button>  
                  <button className='btn-primary btn m-1'><FontAwesomeIcon icon={faPlus}/>Add Section  </button>
                </Col>
              </Row>
              <Row>
              <Col xs={12} sm={12} md={12} lg={12} className='p-2'>
                  <button className='btn-primary btn m-1'>Monday at 5 </button> 
                </Col>
              </Row>
              <TreeTable></TreeTable>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row >
    </div >

  );
};

export default HomeCenter;
//<button onClick={() => auth.logOut()} className="btn-submit">
//logout
//</button>
