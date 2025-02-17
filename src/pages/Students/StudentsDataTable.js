import React, {useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import {GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons} from '@mui/x-data-grid';


const initialRows = [
    {
      id: 1,
   
      firstName: 'John',
      lastName: 'Doe',
      parentName: 'Market',
      phone: '123-456-7890',
      course: 'Mathematics',
      package: 'Basic',
      center: 'Downtown Center'
    },
    {
      id: 2,
     
      firstName: 'Jane',
      lastName: 'Smith',
      parentName: 'Market',
      phone: '987-654-3210',
      course: 'Physics',
      package: 'Premium',
      center: 'Uptown Center'
    },
    {
      id: 3,
    
      firstName: 'Samuel',
      lastName: 'Jackson',
      parentName: 'Market',
      phone: '555-123-4567',
      course: 'Computer Science',
      package: 'Advanced',
      center: 'Main Center'
    },
    {
      id: 4,
    
      firstName: 'Alice',
      lastName: 'Brown',
      parentName: 'Market',
      phone: '111-222-3333',
      course: 'Literature',
      package: 'Basic',
      center: 'West Side Center'
    },
    {
      id: 5,
    
      firstName: 'Bob',
      lastName: 'White',
      parentName: 'Market',
      phone: '444-555-6666',
      course: 'History',
      package: 'Premium',
      center: 'East Side Center'
    },
    {
      id: 6,
     
      firstName: 'Charlie',
      lastName: 'Green',
      parentName: 'Market',
      phone: '777-888-9999',
      course: 'Biology',
      package: 'Standard',
      center: 'North Center'
    },
    {
      id: 7,
 
      firstName: 'Eva',
      lastName: 'Davis',
      parentName: 'Market',
      phone: '123-234-3456',
      course: 'Chemistry',
      package: 'Basic',
      center: 'South Center'
    },
    {
      id: 8,
     
      firstName: 'Michael',
      lastName: 'Wilson',
      parentName: 'Market',
      phone: '555-666-7777',
      course: 'Philosophy',
      package: 'Advanced',
      center: 'City Center'
    },
    {
      id: 9,
    
      firstName: 'Sarah',
      lastName: 'Moore',
      parentName: 'Market',
      phone: '888-999-0000',
      course: 'Psychology',
      package: 'Standard',
      center: 'Park Center'
    },
    {
      id: 10,
    
      firstName: 'Daniel',
      lastName: 'Taylor',
      parentName: 'Market',
      phone: '111-333-5555',
      course: 'Engineering',
      package: 'Premium',
      center: 'Central Center'
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
const StudentsDataTable = ({id, getAPIData, strAPIName })=> {
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
 
    column["field"] = "firstName";
    column["headerName"] = "First Name";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
    columns.push(column);
    column = {};
    column["field"] = "lastName";
    column["headerName"] = "Last Name";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
    columns.push(column);
    column = {};
    column["field"] = "parentName";
    column["headerName"] = "Parent Name";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
    columns.push(column);
    column = {};
    column["field"] = "phone";
    column["headerName"] = "Phone #";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
    columns.push(column);
    column = {};
    column["field"] = "course";
    column["headerName"] = "Course";
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
    columns.push(column);
    column = {};
    column["field"] = "package";
    column["headerName"] = "Package";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
    columns.push(column);
    column = {};
    column["field"] = "center";
    column["headerName"] = "Center";
    column["width"] = 180;
    column["editable"] = true;
    column["headerClassName"]= 'mainrow';
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
export default  StudentsDataTable;