import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Nav, Tab } from 'react-bootstrap';

import UserTypesDataTable from "./UserTypesDataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,  faSave, } from '@fortawesome/free-solid-svg-icons';
import './settings.scss';

const Settings = () => {
    const [key, setKey] = useState('menu');
    return (
        <div className="container-fluid main-settings mt-1">
            <Row className="h-100">
                <Tab.Container id="settingsTabs" defaultActiveKey="userType">
                    <Row>
                        <Col sm={2} className='p-0'>
                            <div className='settings-nav-container h-100' >
                                <div className='settings-text p-2'> Settings</div>
                                <Nav variant="pills" className="settings-nav flex-column" onSelect={setKey}>
                                    <Nav.Item>
                                        <Nav.Link eventKey="userType">
                                            <FontAwesomeIcon icon={faUser} className='me-2'></FontAwesomeIcon>
                                            User Types</Nav.Link>
                                    </Nav.Item>


                                </Nav>
                            </div>
                        </Col>
                        <Col sm={10} className='p-0'>
                            <div className='settings-tab h-100'>
                                <Tab.Content className='h-100'>
                                    <Tab.Pane eventKey="userType">
                                        <div className='usertypes-text'>
                                            <span>Manage User Types</span>
                                        </div>
                                       
                                        <div className='settings-table'>
                                            <UserTypesDataTable></UserTypesDataTable>
                                        </div>
                                    </Tab.Pane>


                                </Tab.Content>
                            </div>
                        </Col>
                    </Row>
                </Tab.Container>
            </Row>
        </div>
    );

}

export default Settings;