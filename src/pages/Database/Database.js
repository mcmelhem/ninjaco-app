import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { Row, Accordion } from 'react-bootstrap';
import CentersDataTable from "./CentersDataTable";
import TeamDataTable from "./TeamDataTable";
import CoursesPackagesDataTable from "./CoursesPackagesDataTable";
import './database.scss';

const Database = () => {
    const [activeKey, setActiveKey] = useState(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };
    useEffect(() => {
        if (params.get('openAccordion')) {
            setActiveKey(params.get('openAccordion') );
            
        }
    });
  
    return (
        <div className="container-fluid">
            <Row className="h-100">
                <div className='wrapper-content h-100 p-0'>
                    <Accordion className='p-0' defaultActiveKey={activeKey} activeKey={activeKey} onSelect={handleSelect} alwaysOpen>
                        <Accordion.Item eventKey="centers">
                            <Accordion.Header>Centers</Accordion.Header>
                            <Accordion.Body>
                            {activeKey == 'centers' && (
                                  <CentersDataTable></CentersDataTable>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="team">
                            <Accordion.Header>Team</Accordion.Header>
                            <Accordion.Body>
                            {activeKey == 'team' && (
                                    <TeamDataTable></TeamDataTable>
                                )}
                            </Accordion.Body>
                        </Accordion.Item >
                        <Accordion.Item eventKey="courses">
                            <Accordion.Header>Courses</Accordion.Header>
                            <Accordion.Body>
                            {activeKey == 'courses' && (
                                  <CoursesPackagesDataTable></CoursesPackagesDataTable>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="packages">
                            <Accordion.Header>Packages</Accordion.Header>
                            <Accordion.Body>
                            {activeKey == 'packages' && (
                                    <CoursesPackagesDataTable></CoursesPackagesDataTable>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Row>
        </div>
    );

}

export default Database;