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




const MenuItemsDataTable = ({id, getAPIData, strAPIName })=> {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  useEffect(() => {
    if (getAPIData) {
      const token = localStorage.getItem("loggedinUser");
      axios.get(API_BASE_URL + '/api/' + strAPIName, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then((response) => {
        if (response.hasOwnProperty("data")) {
          const data = response.data;
          setRows(data);
        }
      })
        .catch((error) => {
          console.error("Error fetching user", error);
        });
    }
  }, [getAPIData, strAPIName]);

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
  
  const columns = [
      {
       field: 'actions',
             type: 'actions',
             headerName: 'Actions',
             width: 120,
             cellClassName: 'actions',
             getActions: ({ id }) => {
               const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
               if (isInEditMode) {
                 return [
                   <GridActionsCellItem
                     icon={<FontAwesomeIcon icon={faSave} />}
                     label="Save"
                     className="grid-btn"
                     onClick={handleSaveClick(id)}
                   />,
                   <GridActionsCellItem
                     icon={<FontAwesomeIcon icon={faCancel} />}
                     label="Cancel"
                     className="grid-btn"
                     onClick={handleCancelClick(id)}
                   />,
                 ];
               }
       
               return [
                 <GridActionsCellItem
                   icon={<FontAwesomeIcon icon={faPen} />}
                   label="Edit"
                   className="grid-btn"
                   onClick={handleEditClick(id)}
                 />,
                 <GridActionsCellItem
                   icon={<FontAwesomeIcon icon={faTrash} />}
                   label="Delete"
                   className="grid-btn"
                   onClick={handleDeleteClick(id)}
                 />,
               ];
              
        },
      },
          
      { field: "id", headerName: "id", width: 180, editable: true },
      { field: "name", headerName: "Last Name", width: 180, editable: true  }
      {
        field: "rateAmountType", headerName: "Amount Type", width: 180, type: "singleSelect", editable: true ,
         valueOptions: [
         "Fixed Amount", "Per session"
        ]
      },
      { field: "rateAmount", headerName: "Amount", width: 180, editable: true  },
      { field: "fuelRate", headerName: "Fuel Rate", width: 180, editable: true  }
      
      
  
    ]

   
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleAddClick = () => {
      const maxId = Math.max(...rows.map(row => row.id), 0);
      const newId = maxId + 1;
      const newRow = {
        "name": "",
        "id": newId,
        "isNew": true
      };
      setRows((oldRows) => [
        ...oldRows,
        newRow,
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'firstName' }, 
      }));
    };
    
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={handleAddClick}>
          Add Team
        </Button>
        <Button color="primary" startIcon={<FontAwesomeIcon icon={faSave} />} onClick={handleAddClick}>
          Save
        </Button>
      </GridToolbarContainer>
    );
  }
  return (
    
    <Box sx={{ height: 500, width: '100%', '& .actions': { color: 'text.secondary' }, '& .textPrimary': { color: 'text.primary' } }}>
    <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
              toolbar: { setRows, setRowModesModel }
            }}
    />
  </Box>
   
  );
}
export default  MenuItemsDataTable;