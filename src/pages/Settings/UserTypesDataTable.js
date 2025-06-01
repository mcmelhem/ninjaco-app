import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import { Col, Container, Row, Form } from 'react-bootstrap';

var rows = [
  {
    "id": 1,
    "userName": "Jad Daoud",
    "userType": "Owner"
  },
  {
    "id": 2,
    "userName": "Charbel Daoud",
    "userType": "Owner"
  },
  {
    "id": 3,
    "userName": "Tia",
    "userType": "Assistant"
  }
];

const menuItems = [
  { id: 'attendance', label: 'Attendance' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'students', label: 'Students' },
  { id: 'database', label: 'Database' },
  { id: 'payments', label: 'Payments' },
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
const UserTypesDataTable = ({ id, getAPIData, strAPIName }) => {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  /*useEffect(() => {
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
  }, []);*/

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
    { field: "id", hide: true },
    { field: "userName", headerName: "User Name", width: 180, editable: true, type: 'text' },
    { field: "userType", headerName: "User Type", editable: true, type: 'text' },
  ];



  return (
    <Container>
      <Row>
        <Col sm={8} lg={7} className='p-0'>


          <Box
            sx={{
              height: 400,
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
                toolbar: { setRows, setRowModesModel }
              }}

              experimentalFeatures={{ newEditingApi: true }}
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#35538894',
                  color: '#fff'
                },
              }}
              showToolbar />

          </Box>
        </Col>
        <Col sm={4} lg={5} className='p-0' id='granted-MenuAccess'>

          <div  className='m-3 menu-items' >
                <Form >
                  {menuItems.map((item) => (
                    <Form.Group key={item.id} controlId={item.id}>

                      <Form.Check className='my-3'
                        type="checkbox"
                        label={`${item.label}`}
                        name={item.id}
                      /* checked={formData[item.id]}
                       onChange={handleChange}*/
                      />
                    </Form.Group>
                  ))}
                </Form>
           
              <Col md={2}>
                <button className='btn-add btn mx-1 ms-2 save-btn save-btn-float'>
                  <FontAwesomeIcon icon={faSave} /> Save
                </button>
              </Col>

        

          </div>
        </Col>

      </Row>
    </Container >
  );
}
export default UserTypesDataTable;