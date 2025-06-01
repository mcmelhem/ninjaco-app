import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Tab, Tabs, Col, Nav } from 'react-bootstrap';
import IncomeDataTable from "./IncomeDataTable";
import ExpensesDataTable from "./ExpensesDataTable";
import CentersPaymentDataTable from "./CentersPaymentDataTable";
import TeamPaymentDataTable from "./TeamPaymentDataTable";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faMoneyBill, faChalkboardTeacher, faUsersLine } from '@fortawesome/free-solid-svg-icons';
import './payment.scss';
const Payments = () => {
    const [activeKey, setActiveKey] = useState(['income']);
    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };
    return (
        <div className="container-fluid">
            <Row className="h-100">
                <div className='wrapper-content h-100 p-0'>
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={activeKey}
                        onSelect={handleSelect}
                        className="m-1 ms-2 payment-tabs"

                    >
                        <Tab eventKey="income" title={
                            <>
                                <FontAwesomeIcon icon={faFileInvoiceDollar} className='me-1' />
                                Income
                            </>
                        }>
                            {activeKey.includes("income") && <IncomeDataTable blnIncome={true}></IncomeDataTable>}
                        </Tab>
                        <Tab eventKey="expenses" title={
                            <>
                                <FontAwesomeIcon icon={faMoneyBill} className='me-1' />
                                Expenses
                            </>
                        }>
                            {activeKey.includes("expenses") && <ExpensesDataTable blnIncome={false}></ExpensesDataTable>}
                        </Tab>
                        <Tab eventKey="centers" title={
                            <>
                                <FontAwesomeIcon icon={faChalkboardTeacher} className='me-1' />
                                Centers
                            </>
                        }>
                            {activeKey.includes("centers") && <CentersPaymentDataTable></CentersPaymentDataTable>}
                        </Tab>
                        <Tab eventKey="teamPayment"
                            title={
                                <>
                                    <FontAwesomeIcon icon={faUsersLine} className='me-1' />
                                    Team
                                </>
                            }>
                            {activeKey.includes("teamPayment") && <TeamPaymentDataTable></TeamPaymentDataTable>}
                        </Tab>
                    </Tabs>

                </div>

            </Row>
        </div>
    );

}

export default Payments;