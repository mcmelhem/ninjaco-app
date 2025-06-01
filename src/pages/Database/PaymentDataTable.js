import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';


const initialRows = [
  {
    id: 1,
    name: 'Test1',
    age: 25,
    joinDate: new Date(),
    role: 'Market'
  },
  {
    id: 2,
    name: 'Test2',
    age: 36,
    joinDate: new Date(),
    role: 'Market'
  },
  {
    id: 3,
    name: 'Test3',
    age: 19,
    joinDate: new Date(),
    role: 'Market'
  },
  {
    id: 4,
    name: 'Test4',
    age: 28,
    joinDate: new Date(),
    role: 'Market'
  },
  {
    id: 5,
    name: 'Test5',
    age: 23,
    joinDate: new Date(),
    role: 'Market'
  },
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
const DataTable = ({ id, getAPIData, strAPIName }) => {
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
     const handleAddClick = () => {
        const maxId = Math.max(...rows.map(row => row.id), 0);
        const newId = maxId + 1;
        const newRow = {
          "firstName": "",
          "lastName": "",
          "phoneNumber": "",
          "location": "",
          "coordinates": "",
          "perday": "",
          "persession": "",
          "fuelRate": " ",
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
              className="grid-btn"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<FontAwesomeIcon icon={faCancel} />}
              label="Cancel"
              className="grid-btn"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faPen} />}
            label="Edit"
            className="grid-btn"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faTrash} />}
            label="Delete"
            className="grid-btn"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    }
    const addCol = {
      field: 'add',
      type: 'add',
      headerName: '',
      width: 100,
      renderHeader: () => (
        <Button className='add-row-btn p-1' title='Add' onClick={handleAddClick}><FontAwesomeIcon icon={faPlus} /></Button>
      ),
      filterable: false,
      disableColumnMenu: true,
      sortable: false,

    }
    columns.push(addCol);
    columns.push(actionsColumn);
    for (let key in jsonRow) {
      var column = {};
      if (key != "id") {
        column["field"] = key;
        column["headerName"] = key;
        column["width"] = 150;
        column["editable"] = true;
        columns.push(column);
      }

    }

   

    return columns;
  }
  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={SetColumns(rows[0])}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        showToolbar />
    </div>
  );
}
export default DataTable;