import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import CentersDataTable from "./CentersDataTable";
import TeamDataTable from "./TeamDataTable";
import PaymentDataTable from "./PaymentDataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faMoneyBill, faChalkboardTeacher, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import './database.scss';

const Database = () => {
    const [activeKey, setActiveKey] = useState(['centers']);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };
    useEffect(() => {
        if (params.get('openAccordion')) {
            setActiveKey(params.get('openAccordion'));

        }
    });

    return (
        <div className="container-fluid">
            <Row className="h-100">
                <div className='wrapper-content h-100 p-0'>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={activeKey}
                        onSelect={handleSelect}
                        className="m-1 database-tabs"
                    >
                        <Tab eventKey="centers" title={
                            <>
                                <FontAwesomeIcon icon={faChalkboardTeacher} className='me-1' />
                                Centers
                            </>
                        }>
                            {activeKey.includes("centers") && (
                                <CentersDataTable></CentersDataTable>
                            )}
                        </Tab>
                        <Tab eventKey="team" title={
                            <>
                                <FontAwesomeIcon icon={faUsersLine} className='me-1' />
                                Team
                            </>
                        }>
                            {activeKey.includes('team') && (
                                <TeamDataTable></TeamDataTable>
                            )}
                        </Tab>

                        <Tab eventKey="payment" title={
                            <>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} className='me-1' />
                                Payment Categories
                            </>
                        } >
                            {activeKey.includes('payment') && (
                                <div className='payment-tab-content'>
                                    <Row>
                                        <Col md={6} className='pe-0'>
                                            <div className='payment-text'>
                                                <span>Income Payment Source</span>
                                            </div>
                                            <div className='settings-table'>
                                                <PaymentDataTable
                                                    id="paymentsource"
                                                    getAPIData={true}
                                                    strAPIName="GetIncomeSource"
                                                />
                                            </div>
                                        </Col>
                                        <Col md={6} className='pe-0'>
                                            <div className='payment-text'>
                                                <span>Expenses Payment Source</span>
                                            </div>
                                            <div className='settings-table'>
                                                <PaymentDataTable
                                                    id="paymentsource"
                                                    getAPIData={true}
                                                    strAPIName="GetExpensesSource"
                                                ></PaymentDataTable>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                            
                        </Tab>
                    </Tabs>

                </div>
            </Row>
        </div>
    );

}

export default Database;