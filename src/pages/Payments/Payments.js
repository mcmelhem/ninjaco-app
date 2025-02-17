import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Accordion } from 'react-bootstrap';
import IncomeExpensesDataTable from "./IncomeExpensesDataTable";
import AllPaymentsDataTable from "./AllPaymentsDataTable";

const Payments = () => {
    const [activeKey, setActiveKey] = useState(null);
    const handleSelect = (eventKey) => {
        setActiveKey(eventKey);
    };
    return (
        <div className="container-fluid">
            <Row className="h-100">
                <div className='wrapper-content h-100 p-0'>
                    <Accordion className='p-0'
                        defaultActiveKey={0}
                        alwaysOpen
                        activeKey={activeKey}
                        onSelect={handleSelect}>
                        <Accordion.Item eventKey="0"  >
                            <Accordion.Header>Income</Accordion.Header>
                            <Accordion.Body>

                                {activeKey == "0" &&     <IncomeExpensesDataTable blnIncome={true}></IncomeExpensesDataTable>}

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1"  >
                            <Accordion.Header>Expenses</Accordion.Header>
                            <Accordion.Body>

                            {activeKey == "1" &&     <IncomeExpensesDataTable blnIncome={false}></IncomeExpensesDataTable>}

                            </Accordion.Body>
                        </Accordion.Item >
                        <Accordion.Item eventKey="2" >
                            <Accordion.Header>Centers Payments</Accordion.Header>
                            <Accordion.Body>

                            {activeKey == "2" &&     <AllPaymentsDataTable></AllPaymentsDataTable>}
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </div>
            </Row>
        </div>
    );

}

export default Payments;