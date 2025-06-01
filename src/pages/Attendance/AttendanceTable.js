import React from "react";
import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Form, Button} from 'react-bootstrap';
import AttendancePaymentModal from './AttendancePaymentModal';
import './attendancetable.scss';


function RowTable(props) {
  const { row, columns, subColumns } = props;
  const [open, setOpen] = useState(false);
 const [isAttendancePaymentModalOpen, setisAttendancePaymentModalOpen] = useState(false);
 const [modalTitle, setModalTitle] = useState('');
 const changeAttendance = (blnShowModal) => {
  setModalTitle('Modify');
  setisAttendancePaymentModalOpen(blnShowModal);
}
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell className="collapsibleRow">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </IconButton>
          <Button
            aria-label="add payment"
            size="small"
            onClick={() => changeAttendance(true)}
            className= "btn-addpayment btn ms-1"
          >
           <FontAwesomeIcon icon={faPlus} />  Payment
          </Button>
           <AttendancePaymentModal rowModify = {row} isOpen={isAttendancePaymentModalOpen} onClose={() => changeAttendance(false)} title={modalTitle}> 
           </AttendancePaymentModal>
        </TableCell>
      
        {Object.keys(row).map((key) => {
          if (typeof row[key] === "string") {
            return key === "name" ? (
              <TableCell className="collapsibleRow" component="th" scope="row" key={key}>
                {row[key]}
              </TableCell>
            ) : (
              <TableCell className="collapsibleRow" key={key}>{row[key]}</TableCell>
            );
          }
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={13}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow >
                    <TableCell key={0} scope="row" className="subrow"> Attendance Report </TableCell>
                    {Object.values(row.history).map(([histKey]) => {
                      return (
                        <TableCell className="subrow" scope="row" key={Math.random()}>
                          {row.history[histKey]}
                        </TableCell>
                      )
                    })}
                    <TableCell scope="row" className="subrow"> Needs Certificate  </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const AttendanceTable = ({example}) => {
  const [columns, setColumns] = useState([]);
  const [subColumns, setSubColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = {
        columns: ["id", "Name", "Total", "Level", "Progress", "Course", "Packages", "Session", "Paid", "Discount", "Remaining", "Last Payment", "Status"],
        subColumns: [
          { label: "Attendance Report" },
          { label: "Needs Certificate" }
        ],
        rows: [
          {
            id: 1,
            name: "Jad Daoud",
            total: "56",
            level: "Level 6",
            progress: "6/10",
            course: "Lego EV3",
            packages: "4 sessions",
            session: "2/4",
            paid: "0$",
            discount: "0$",
            remaining: "0$",
            lastpayment: "2024-10-10",
            status: "Needs to pay",
            history: [
              "1/1/11", "4/1/11", "5/1/11", "1/1/11", "4/1/11", "5/1/11",
              "1/1/11", "4/1/11", "5/1/11", "4/1/11", "5/1/11", "5/1/11"
            ]
          },
          {
            id: 2,
            name: "MC",
            total: "56",
            level: "Level 6",
            progress: "6/10",
            course: "Lego EV3",
            packages: "4 sessions",
            session: "2/4",
            paid: "0$",
            discount: "0$",
            remaining: "0$",
            lastpayment: "2024-10-10",
            status: "Needs to pay",
            history: [
              "1/1/11", "4/1/11", "5/1/11", "1/1/11", "4/1/11", "5/1/11",
              "1/1/11", "4/1/11", "5/1/11", "4/1/11", "5/1/11", "5/1/11"
            ]
          },
         
        ]
      };
      setColumns(response.columns);
      setSubColumns(response.subColumns);
      setRows(response.rows);
    };
   
    if(example == true){
      fetchData();
    }

    
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell  className= "mainRow"/>
            {columns.map((col, idx) =>
              col != "id" ? <TableCell className= "mainRow" key={idx}>{col}</TableCell> : ""
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <RowTable key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AttendanceTable;
