import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

var incomeData = [
  {
    "id": 1,
    "description": "Payment for session 1",
    "date": "2025-02-10",
    "source": "Session for Kid",
    "incomeValue": "$100"
  },
  {
    "id": 2,
    "description": "Payment for session 2",
    "date": "2025-02-12",
    "source": "Innovative Learning Hub (Center)",
    "incomeValue": "$250"
  },
  {
    "id": 3,
    "description": "Payment for workshop",
    "date": "2025-02-14",
    "source": "Session for Kid",
    "incomeValue": "$150"
  }
];
var expensesData = [
  {
    "id": 1,
    "description": "Office maintenance",
    "date": "2025-02-10",
    "source": "Maintenance",
    "expenseValue": "$150"
  },
  {
    "id": 2,
    "description": "Salary for instructor (John Doe)",
    "date": "2025-02-12",
    "source": "Salary for Instructor",
    "expenseValue": "$2000"
  },
  {
    "id": 3,
    "description": "Materials for coding course",
    "date": "2025-02-14",
    "source": "Materials",
    "expenseValue": "$300"
  },
  {
    "id": 4,
    "description": "Office maintenance",
    "date": "2025-02-15",
    "source": "Maintenance",
    "expenseValue": "$180"
  }
];





function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 1;
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
const IncomeExpensesDataTable = ({ id, getAPIData, strAPIName, blnIncome }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    if (getAPIData == true) {
      const token = localStorage.getItem("loggedinUser");
      axios.get(API_BASE_URL + '/api/' + strAPIName, {
        headers: {
          Authorization: `Bearer ${token}`
        },

      }).then((response) => {
        if (response.hasOwnProperty("data") == true) {
          var data = response.data;
          setRows(data);

        }
      })
        .catch((error) => {
          console.error("Error fetching user", error);
        });
    }
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };


  function SetColumns() {
    const incomeColumns = [];
    const expenseColumns = [];

    console.log(blnIncome)

    var actionsColumn = {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faSave} />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faCancel} />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faPen} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
    actionsColumn["headerClassName"] = 'mainrow';
    var column = {};
  /*  column["field"] = "id";
    column["headerName"] = "ID";
    column["width"] = 100;
    column["editable"] = false;
    column["headerClassName"] = 'mainrow';
    incomeColumns.push(column);*/

    column = {};
    column["field"] = "description";
    column["headerName"] = "Description";
    column["width"] = 250;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    incomeColumns.push(column);

    column = {};
    column["field"] = "date";
    column["headerName"] = "Date";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    incomeColumns.push(column);

    column = {};
    column["field"] = "source";
    column["headerName"] = "Source";
    column["width"] = 200;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    incomeColumns.push(column);

    column = {};
    column["field"] = "incomeValue";
    column["headerName"] = "Income Value";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    incomeColumns.push(column);


    // expenses
    var column = {};
 /*   column["field"] = "id";
    column["headerName"] = "ID";
    column["width"] = 100;
    column["editable"] = false;
    column["headerClassName"] = 'mainrow';
    expenseColumns.push(column);*/


    column = {};
    column["field"] = "description";
    column["headerName"] = "Description";
    column["width"] = 250;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    expenseColumns.push(column);


    column = {};
    column["field"] = "date";
    column["headerName"] = "Date";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    expenseColumns.push(column);


    column = {};
    column["field"] = "source";
    column["headerName"] = "Source";
    column["width"] = 200;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    expenseColumns.push(column);


    column = {};
    column["field"] = "expenseValue";
    column["headerName"] = "Expense Value";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    expenseColumns.push(column);
    if (blnIncome == true) {
      return incomeColumns
    } else {
      return expenseColumns;
    }

  }
  return (

    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >

      <DataGrid
        rows={blnIncome ? incomeData : expensesData}
        columns={SetColumns()}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}

      />

    </Box>

  );
}
export default IncomeExpensesDataTable;