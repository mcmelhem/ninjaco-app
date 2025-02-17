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
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import './attendancetable.scss';

function createData(
  id,
  name,
  total,
  level,
  progress,
  course,
  packages,
  session,
  paid,
  discount,
  remaining,
  lastpayment,
  status,
  hist
) {
  return {
    id,
    name,
    total,
    level,
    progress,
    course,
    packages,
    session,
    paid,
    discount,
    remaining,
    lastpayment,
    status,
    history: hist,
  };
}
const rows = [
  createData(1, "Jad Daoud", "56", "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay", [


    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "4/1/11",
    "5/1/11",
    "5/1/11",
    "5/1/11",
    "5/1/11"
  ]),
  createData(2, "Jad Daoud", "56", "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay", [


    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "4/1/11",
    "5/1/11"


  ]),
  createData(3, "Jad Daoud", "56", "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay", [


    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "4/1/11",
    "5/1/11"


  ]),
  createData(4, "Jad Daoud", "56", "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay", [


    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "1/1/11",
    "4/1/11",
    "5/1/11",
    "4/1/11",
    "5/1/11"


  ])
];
const columns = [
  "id", "Name", "Total", "Level", "Progress", "Course", "Packages", "Session",
  "Paid", "Discount", "Remaining", "Last Payment", "Status",
];
const subcolumns = ["date", "Customer"];

function RowTable(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

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

const AttendanceTable = (props) => {
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
