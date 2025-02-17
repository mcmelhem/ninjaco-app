import React from "react";
import { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

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
  status
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
    history: [
      {
        date: "2020-01-05",
        Customer: "test",
      },
      {
        date: "2020-01-02",
        Customer: "test",
      },
    ],
  };
}
const rows = [
    createData( 1, "Jad Daoud", 56, "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay" ),
    createData( 2, "Jad Daoud", 56, "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay" ),
    createData( 3, "Jad Daoud", 56, "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay" ),
    createData( 4, "Jad Daoud", 56, "Level 6", "6/10", "Lego EV3", "4 sessions", "2/4", "0$", "0$", "0$", "2024-10-10", "Needs to pay" )
];
const columns = [
  "id",
  "name",
  "total",
  "level",
  "progress",
  "course",
  "packages",
  "session",
  "paid",
  "discount",
  "remaining",
  "lastpayment",
  "status",
];
const subcolumns = ["date", "Customer"];

function RowTable(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
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
              <TableCell component="th" scope="row" key={key}>
                {row[key]}
              </TableCell>
            ) : (
              <TableCell key={key}>{row[key]}</TableCell>
            );
          }
        })}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {subcolumns.map((col, idx) => (
                      <TableCell key={idx}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      {Object.keys(historyRow).map((key) => {
                        return key === "date" ? (
                          <TableCell component="th" scope="row" key={key}>
                            {historyRow[key]}
                          </TableCell>
                        ) : (
                          <TableCell key={key}>{historyRow[key]}</TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const TreeTable = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((col, idx) =>
              col != "id" ? <TableCell key={idx}>{col}</TableCell> : ""
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

export default TreeTable;
