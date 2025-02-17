import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

var initialRows = [
  {
    "id": 1,
    "name": "Artlet",
    "dueDate": "2025-02-25",
    "value": "$150"
  },
  {
    "id": 2,
    "name": "Vol",
    "dueDate": "2025-02-28",
    "value": "$50"
  },
  {
    "id": 3,
    "name": "Edustation",
    "dueDate": "2025-03-05",
    "value": "$100"
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
const AllPayments = ({ id, getAPIData, strAPIName }) => {
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


  function SetColumns(jsonRow) {
    const columns = [];
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
    columns.push(actionsColumn);

    var column = {};
    column["field"] = "id";
    column["headerName"] = "ID";
    column["width"] = 100;
    column["editable"] = false;
    column["headerClassName"] = 'mainrow';
    columns.push(column);

    column = {};
    column["field"] = "name";
    column["headerName"] = "Name";
    column["width"] = 250;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);

    column = {};
    column["field"] = "dueDate";
    column["headerName"] = "Due Date";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);

    column = {};
    column["field"] = "value";
    column["headerName"] = "Value";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);

    console.log(columns);


    return columns;
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
        rows={initialRows}
        columns={SetColumns(initialRows[0])}
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
export default AllPayments;