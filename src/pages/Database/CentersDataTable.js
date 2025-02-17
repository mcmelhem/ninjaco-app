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
    "centerName": "Sunshine Academy",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1-555-1234",
    "location": "New York",
    "type": "Home Session",
    "paymentType": "Per kid per session"
  },
  {
    "id": 2,
    "centerName": "Innovative Learning Hub",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1-555-5678",
    "location": "Los Angeles",
    "type": "Center",
    "paymentType": "Per package (percentage)"
  },
  {
    "id": 3,
    "centerName": "Future Scholars Center",
    "firstName": "Michael",
    "lastName": "Johnson",
    "phone": "+1-555-8765",
    "location": "Chicago",
    "type": "School",
    "paymentType": "Per session"
  },
  {
    "id": 4,
    "centerName": "Creative Minds Studio",
    "firstName": "Emily",
    "lastName": "Davis",
    "phone": "+1-555-4321",
    "location": "Houston",
    "type": "Summer Camp",
    "paymentType": "Fixed Amount"
  },
  {
    "id": 5,
    "centerName": "Bright Horizons Academy",
    "firstName": "Chris",
    "lastName": "Brown",
    "phone": "+1-555-6789",
    "location": "Miami",
    "type": "Home Session",
    "paymentType": "Per kid per session"
  },
  {
    "id": 6,
    "centerName": "Peak Performance Training",
    "firstName": "Sarah",
    "lastName": "Wilson",
    "phone": "+1-555-2345",
    "location": "Seattle",
    "type": "Center",
    "paymentType": "Per package (percentage)"
  },
  {
    "id": 7,
    "centerName": "Global Arts Academy",
    "firstName": "James",
    "lastName": "Taylor",
    "phone": "+1-555-9876",
    "location": "Boston",
    "type": "School",
    "paymentType": "Per session"
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
const CentersDataTable = ({ id, getAPIData, strAPIName }) => {
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

    var column = {};

    /*var column = {};
    column["field"] = "id";
    column["headerName"] = "ID";
    column["width"] = 100;
    column["editable"] = false;
    column["headerClassName"] = 'mainrow';
    columns.push(column);*/
    column = {};
    column["field"] = "centerName";
    column["headerName"] = "Center Name";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);
    
    column = {};
    column["field"] = "firstName";
    column["headerName"] = "First Name";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);
    
    column = {};
    column["field"] = "lastName";
    column["headerName"] = "Last Name";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);
    
    column = {};
    column["field"] = "phone";
    column["headerName"] = "Phone Number";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);
    
    column = {};
    column["field"] = "location";
    column["headerName"] = "Location";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);
    
    column = {};
    column["field"] = "type";
    column["headerName"] = "Type";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);
    
    column = {};
    column["field"] = "paymentType";
    column["headerName"] = "Payment Type";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"] = 'mainrow';
    columns.push(column);

    

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
export default CentersDataTable;