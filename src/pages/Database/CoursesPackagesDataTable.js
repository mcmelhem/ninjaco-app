import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

import './database.scss';
var courseData = [

  {
    "id": 1,
    "courseName": "Wedo",
    "sessionsPerPackage": "10",
    "packagePrice": "$220"
  },
  {
    "id": 2,
    "courseName": "Wedo",
    "sessionsPerPackage": "5",
    "packagePrice": "$120"
  },
  {
    "id": 3,
    "courseName": "EV3",
    "sessionsPerPackage": "12",
    "packagePrice": "$350"
  },
  {
    "id": 4,
    "courseName": "EV3",
    "sessionsPerPackage": "5",
    "packagePrice": "$250"
  },
  {
    "id": 5,
    "courseName": "Coding for Beginners",
    "sessionsPerPackage": "4",
    "packagePrice": "$450"
  }
];




const CoursesPackages = ({ id, getAPIData, strAPIName }) => {
  const [rows, setRows] = useState(courseData);
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
  const handleAddClick = () => {
    const maxId = Math.max(...rows.map(row => row.id), 0);
    const newId = maxId + 1;
    const newRow = {
      "centerName": "",
      "firstName": "",
      "lastName": "",
      "phone": "",
      "location": "",
      "type": "",
      "paymentType": " ",
      "id": newId,
      "isNew": true
    };
    setRows((oldRows) => [
      ...oldRows,
      newRow,
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'courseName' },
    }));
  };


  const columns = [
    {
      field: 'add',
      type: 'add',
      headerName: '',

      renderHeader: () => (
        <Button className='add-row-btn p-1' title='Add' onClick={handleAddClick}><FontAwesomeIcon icon={faPlus} /></Button>
      ),
      filterable: false,
      disableColumnMenu: true,
      sortable: false,

    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',

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
    },

    { field: "courseName", headerName: "Course Name",flex:1, editable: true },
    { field: "sessionsPerPackage", headerName: "NB Sessions Per Package", flex:1, editable: true },
    { field: "packagePrice", headerName: "Package Price", flex:1, editable: true },


  ]


  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;



    return (
      <GridToolbarContainer>

      </GridToolbarContainer>
    );
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
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#35538894',
              color: '#fff'
            },
          }}
           />
    </Box>
  );
}
export default CoursesPackages;