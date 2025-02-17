import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Form, } from 'react-bootstrap';
import IncomeExpensesModal from './IncomeExpensesModal';
import EventsModal from './EventModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import './Home.scss';

const Home = () => {
  const [isBalanceModalOpen, setisBalanceModalOpen] = useState(false);
  const [isEventsModalOpen, setisEventsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const [balanceValue, setBalanceValue] = useState('2.00%');
  const [incomeValue, setIncomeValue] = useState('$8000');
  const [expensesValue, setExpensesValue] = useState('$9000');
  const [netValue, setNetValue] = useState('$1000');

  const [activeData, setActiveData] = useState({
    activeCenters: "20",
    activeInstructor: "12",
    activeStudents: "1,230",
    activeStudentsNew: "23%",
    activeStudentsReturn: "77%",
    activeRobots: "5,875"
  });

  const [growthData, setGrowthData] = useState([
    {
      id: 1,
      location: "NinjaCo HQ",
      students: 33,
      growthPercentage: "1.1%",
      progress: 75,
    },
    {
      id: 2,
      location: "TechWorks",
      students: 45,
      growthPercentage: "+50%",
      progress: 85,
    },

  ]);
  const [unpaidBalances, setUnpaidBalances] = useState([]);

  const [schedule, setSchedule] = useState([]);

  const [scheduleItems, setScheduleItems] = useState([]);

  const navigate = useNavigate();
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const todaysDate = currentDate.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  });
  useEffect(() => {

    const unpaidBalances = [
      { id: 1, name: 'Artlet Atelier', month: 'Nov', amount: '$200' },
      { id: 2, name: 'Creative Co.', month: 'Nov', amount: '$300' },
      { id: 3, name: 'Design Studios', month: 'Nov', amount: '$150' },
    ];
    setUnpaidBalances(unpaidBalances);

    const schedule = [
      { id: 1, center: 'NinjaCo HQ', location: 'Rabieh', time: '4:00pm', host: 'Jad Daoud' },
      { id: 2, center: 'TechWorks', location: 'Rabieh', time: '5:30pm', host: 'Sarah Ali' },
      { id: 3, center: 'Creative Space', location: 'Rabieh', time: '3:00pm', host: 'Mark Henry' },
    ];

    setSchedule(schedule);

    const scheduleItems = [
      { id: 1, location: 'NinjaCo HQ', attendee: 'Rabieh', time: 'Fri 22 Nov @4pm' },
      { id: 2, location: 'TechWorks', attendee: 'Ali', time: 'Mon 25 Nov @5pm' },
      { id: 3, location: 'Creative Space', attendee: 'Zoe', time: 'Tue 26 Nov @2pm' },
    ];

    setScheduleItems(scheduleItems);


  }, []);

  const showMoreUnpaidBalance = () => {
    navigate("/payments");
  };

  const showAddIncomeExpensesModal = (blnShowModal, blnIcome) => {
    if (blnIcome) {
      setModalTitle('Add Income');
    } else {
      setModalTitle('Add Expenses');
    }
    setisBalanceModalOpen(blnShowModal);
  };

  const showMoreBalance = () => {
    navigate("/payments");
  };

  const showAddEventsModal = (blnShowModal) => {
    setModalTitle('Add Event');
    setisEventsModalOpen(blnShowModal);
  }

  const showMoreEvents = () => {
    navigate("/schedule");
  };

  const showActiveCenters = () => {
    navigate("/database?openAccordion=centers");
  };
  const showActiveInstructors = () => {
    navigate("/database?openAccordion=instructors");
  };
  const showStudents = () => {
    navigate("/students");
  };
  return (
    <div className="container-fluid">
      <Row className="h-100">
        <div className='wrapper-content h-100'>
          <Row>
            <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
              <div className='col-first'>
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
                            <span className='balance-value' id='balanceValue'>{balanceValue}</span>
                            <span className='balance-month font-size-sm'>since last month</span>
                          </div>
                        </div>
                      </div>
                      <div className="m-2">
                        <ul className='list-items'>
                          <li className='list-item-balance'>
                            <span>Gross Income</span>
                            <div className='list-item-values'>
                              <span className='font-size-lg' id='incomeValue'>{incomeValue}</span>
                              <button className='btn-balance btn p-0' onClick={() => showAddIncomeExpensesModal(true, true)}>
                                <FontAwesomeIcon icon={faPlus} /> Add Income
                              </button>
                              <IncomeExpensesModal isOpen={isBalanceModalOpen} onClose={() => showAddIncomeExpensesModal(false, true)} title={modalTitle}></IncomeExpensesModal>
                            </div>
                          </li>
                          <li className='list-item-balance'>
                            <span>Expenses</span>
                            <div className='list-item-values'>
                              <span className='font-size-lg' id='expensesValue'>{expensesValue}</span>
                              <button className='btn-balance btn p-0' onClick={() => showAddIncomeExpensesModal(true, false)}>
                                <FontAwesomeIcon icon={faPlus} /> Add Expenses
                              </button>
                              <IncomeExpensesModal isOpen={isBalanceModalOpen} onClose={() => showAddIncomeExpensesModal(false, false)} title={modalTitle}></IncomeExpensesModal>
                            </div>
                          </li>
                          <li className='list-item-balance'>
                            <span>Net</span>
                            <div className='list-item-values'>
                              <span className='font-size-lg' id='netValue'>{netValue}</span>
                              <button className='btn-balance btn p-0' onClick={showMoreBalance}>
                                <FontAwesomeIcon icon={faPlus} /> Show More
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div >
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
              <div className='col-second'>
                <div className="container-fluid mt-3">
                  <div className="card card-rounded card-light-color">
                    <div className="card-statistics">
                      <div className="img-square-wrapper m-2">
                        <img src={require(`../../Images/icons/location.png`)} width="40" height="40" alt="Logo" />
                      </div>
                      <div className="card-statistics-content m-2">
                        <span className="font-size-lg card-statistics-value">{activeData.activeCenters}</span>
                        <span className="card-text"> ACTIVE CENTERS <button className="btn" onClick={showActiveCenters}>  <FontAwesomeIcon icon={faPen} /> </button></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid mt-3">
                  <div className="card card-rounded card-light-color">
                    <div className="card-statistics">
                      <div className="img-square-wrapper m-2">
                        <img src={require(`../../Images/icons/people.png`)} width="40" height="40" alt="Logo" />
                      </div>
                      <div className="card-statistics-content m-2">
                        <span className="font-size-lg card-statistics-value">{activeData.activeInstructor}</span>
                        <span className="card-text"> ACTIVE INSTRUCTORS <button className="btn" onClick={showActiveInstructors}>  <FontAwesomeIcon icon={faPen} /> </button></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
              <div className='col-third'>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <div className="card card-rounded card-light-color">
                        <div className='schedule'>
                          <div className="card-schedule m-2">
                            <div className='schedule-title'>
                              <span className='font-size-md'>Today's Schedule</span>
                              <span className='font-size-md schedule-today'>{todaysDate}</span>
                            </div>
                          </div>

                          <div className="card-body mx-2">
                            <ol className='list-items-schedule'>
                              {schedule.map((item) => (
                                <li key={item.id}>
                                  <div className="row">
                                    <div className="col-4">
                                      <span>{item.center}</span>
                                    </div>
                                    <div className="col-3">
                                      <span>{item.location}</span>
                                    </div>
                                    <div className="col-2">
                                      <span>{item.time}</span>
                                    </div>
                                    <div className="col-3">
                                      <span>{item.host}</span>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ol>
                          </div>
                          <div className="card-upcoming-events">

                            <div className="card-schedule">
                              <div className='schedule-title mx-2 '>
                                <span className='font-size-md'>Upcoming Events</span>
                              </div>
                            </div>

                            <div className="card-body mx-2 pb-0">
                              <ol className='list-items-schedule'>
                                {scheduleItems.map((item) => (
                                  <li key={item.id}>
                                    <div className="row">
                                      <div className="col-4">
                                        <span>{item.location}</span>
                                      </div>
                                      <div className="col-3">
                                        <span>{item.attendee}</span>
                                      </div>
                                      <div className="col-5">
                                        <span>{item.time}</span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ol>
                            </div>
                            <div className='schedule-footer '>
                              <button className='btn btn-primary me-2 btn-addevent' onClick={() => showAddEventsModal(true)}>
                                <FontAwesomeIcon icon={faPlus} /> Add Events
                              </button>
                              <EventsModal isOpen={isEventsModalOpen} onClose={() => showAddEventsModal(false)} title={modalTitle}></EventsModal>
                              <button className='btn btn-secondary me-1 btnshowmore' onClick={showMoreEvents}>Show More</button>
                            </div>
                          </div>

                        </div>
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
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <div className='unpaid-balances'>
                        <div className='card card-rounded card-main-color'>
                          <div className="card-title">
                            <div className="card-balance m-2">
                              <div className='balance-title'>
                                <span className='font-size-lg'>Unpaid Balances</span>
                              </div>
                            </div>
                          </div>
                          <div className="card-body m-2">
                            <ul className='list-items' id='unpaidBalanceList'>
                              {unpaidBalances.map((item) => (
                                <li key={item.id} className="list-item-unpaidbalance">
                                  <div className="row">
                                    <div className="col-8">
                                      <div className="row">
                                        <div className="col-7">
                                          <span>{item.name}</span>
                                        </div>
                                        <div className="col-5">
                                          <span className="unpaidbalance-month">For: {item.month}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-4">
                                      <span>{item.amount}</span>
                                      <button
                                        className="btn p-0 view-unpaidbalance-btn"
                                        onClick={() => showMoreUnpaidBalance(item.id)}
                                      >
                                        View!
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div >
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
                        <span className="font-size-lg card-statistics-value">{activeData.activeStudents}</span>
                        <span className="card-text"> ACTIVE STUDENTS <button className="btn" onClick={showStudents}>  <FontAwesomeIcon icon={faPen} /> </button></span>
                        <div className='students-progress'>
                          <div className="row">
                            <div className="col-3">
                              <span>New </span>
                            </div>
                            <div className="col-5">
                              <div className="progress">
                                <div style={{ width: `${activeData.activeStudentsNew}` }} className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                            <div className="col-2">
                              <span>{activeData.activeStudentsNew}</span>
                            </div>
                          </div>
                        </div>

                        <div className='students-progress'>
                          <div className="row">
                            <div className="col-3">
                              <span>Returning </span>
                            </div>
                            <div className="col-5">
                              <div className="progress">
                                <div   style={{ width: `${activeData.activeStudentsReturn}` }} className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                            </div>
                            <div className="col-2">
                              <span>{activeData.activeStudentsReturn}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="container-fluid mt-3">
                  <div className="card card-rounded card-light-color">
                    <div className="card-statistics">

                      <div className="img-square-wrapper m-2">
                        <img src={require(`../../Images/icons/graduated.png`)} width="40" height="40" alt="Logo" />
                      </div>
                      <div className="card-statistics-content m-2">
                        <span className="font-size-lg card-statistics-value">{activeData.activeRobots}</span>
                        <span className="card-text"> ROBOTS THIS YEAR </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={12} md={12} lg={4} className='p-0'>
              <div className='col-third'>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 mt-3">
                      <div className='growth'>
                        <div className='card card-rounded card-light-color'>
                          <div className="card-growth m-2">
                            <div className='card-growth-title'>
                              <span className='font-size-lg'>Center's Growth</span>
                              <Form.Group className="mb-3 sorting-dropdown" controlId="sorting">
                                <Form.Select aria-label="sorting">
                                  <option value="1">By Students</option>
                                  <option value="2">By Income</option>
                                </Form.Select>
                              </Form.Group>
                            </div>
                          </div>
                          <div className="card-body m-2">

                            {growthData.map((data) => (
                              <div key={data.id}>
                                <span>{data.location}</span>
                                <div className="growth-progress">
                                  <div className="growth-progress-values">
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        style={{ width: `${data.progress}%` }}
                                        role="progressbar"
                                        aria-valuenow={data.progress}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <span>{data.students} students</span>
                                  </div>
                                  <span className="growth-value"> ({data.growthPercentage}) </span>
                                </div>
                              </div>
                            ))}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Row >
    </div>
  );
};

export default Home;

