import React, {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import {GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons} from '@mui/x-data-grid';

var initialRows = [
  {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "phoneNumber": "+1-555-1234",
    "position": "Instructor",
    "rateAmountType": "Per Day",
    "rateAmount": "$200",
    "fuelRate": "Per km",
    "location": "New York"
  },
  {
    "id": 2,
    "firstname": "Jane",
    "lastname": "Smith",
    "phoneNumber": "+1-555-5678",
    "position": "Supervisor",
    "rateAmountType": "Per session",
    "rateAmount": "$50",
    "fuelRate": "Fixed per day",
    "location": "Los Angeles"
  },
  {
    "id": 3,
    "firstname": "Michael",
    "lastname": "Johnson",
    "phoneNumber": "+1-555-8765",
    "position": "Instructor",
    "rateAmountType": "Per Day",
    "rateAmount": "$180",
    "fuelRate": "Per km",
    "location": "Chicago"
  },
  {
    "id": 4,
    "firstname": "Emily",
    "lastname": "Davis",
    "phoneNumber": "+1-555-4321",
    "position": "Supervisor",
    "rateAmountType": "Site Visit",
    "rateAmount": "$100",
    "fuelRate": "Fixed per day",
    "location": "Houston"
  },
  {
    "id": 5,
    "firstname": "Chris",
    "lastname": "Brown",
    "phoneNumber": "+1-555-6789",
    "position": "Instructor",
    "rateAmountType": "Per session",
    "rateAmount": "$75",
    "fuelRate": "Per km",
    "location": "Miami"
  },
  {
    "id": 6,
    "firstname": "Sarah",
    "lastname": "Wilson",
    "phoneNumber": "+1-555-2345",
    "position": "Supervisor",
    "rateAmountType": "Per Day",
    "rateAmount": "$250",
    "fuelRate": "Fixed per day",
    "location": "Seattle"
  },
  {
    "id": 7,
    "firstname": "James",
    "lastname": "Taylor",
    "phoneNumber": "+1-555-9876",
    "position": "Instructor",
    "rateAmountType": "Site Visit",
    "rateAmount": "$120",
    "fuelRate": "Per km",
    "location": "Boston"
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
      <Button color="primary" startIcon={<FontAwesomeIcon icon={faPlus} /> } onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}
const TeamDataTable = ({id, getAPIData, strAPIName })=> {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    if(getAPIData == true){
    const token = localStorage.getItem("loggedinUser");
    axios.get( API_BASE_URL + '/api/'+ strAPIName, {
    headers: {
       Authorization: `Bearer ${token}`
      },

    }).then((response) => {
          if(response.hasOwnProperty("data")== true){
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


function SetColumns(jsonRow){
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
            icon={ <FontAwesomeIcon icon={faSave} /> }
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faCancel} /> }
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={ <FontAwesomeIcon icon={faPen} /> }
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          icon={ <FontAwesomeIcon icon={faTrash} /> }
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,
      ];
    },
  }
  actionsColumn["headerClassName"]= 'mainrow';
   columns.push(actionsColumn);
   
   var column = {};
   
   column["field"] = "firstname";
   column["headerName"] = "First Name";
   column["width"] = 180;
   column["editable"] = true;
   column["headerClassName"] = 'mainrow';
   columns.push(column);
   
   column = {};
   column["field"] = "lastname";
   column["headerName"] = "Last Name";
   column["width"] = 180;
   column["editable"] = true;
   column["headerClassName"] = 'mainrow';
   columns.push(column);
   
   column = {};
   column["field"] = "phoneNumber";
   column["headerName"] = "Phone Number";
   column["width"] = 180;
   column["editable"] = true;
   column["headerClassName"] = 'mainrow';
   columns.push(column);
   
   column = {};
   column["field"] = "position";
   column["headerName"] = "Position";
   column["width"] = 180;
   column["editable"] = true;
   column["headerClassName"] = 'mainrow';
   columns.push(column);
   
  
   column = {};
   column["field"] = "rateAmountType";
   column["headerName"] = "Rate Type";
   column["width"] = 180;
   column["editable"] = true;
   column["headerClassName"] = 'mainrow';
   columns.push(column);

   column = {};
   column["field"] = "rateAmount";
   column["headerName"] = "Rate Amount";
   column["width"] = 180;
   column["editable"] = true;
   column["headerClassName"] = 'mainrow'
   
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
export default  TeamDataTable;