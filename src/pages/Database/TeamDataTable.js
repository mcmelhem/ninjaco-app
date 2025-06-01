import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import DropDown from '../../components/DropDown/CustomDropDown';

var initialRows = [
  {
    "id": 1,
    "firstname": "John",
    "lastname": "Doe",
    "phoneNumber": "+1-555-1234",
    "position": "Instructor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Per km",
    "location": "New York",
    "coordinates": ""
  },
  {
    "id": 2,
    "firstname": "Jane",
    "lastname": "Smith",
    "phoneNumber": "+1-555-5678",
    "position": "Supervisor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Fixed per day",
    "location": "Los Angeles",
    "coordinates": ""
  },
  {
    "id": 3,
    "firstname": "Michael",
    "lastname": "Johnson",
    "phoneNumber": "+1-555-8765",
    "position": "Instructor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Per km",
    "location": "Chicago",
    "coordinates": ""
  },
  {
    "id": 4,
    "firstname": "Emily",
    "lastname": "Davis",
    "phoneNumber": "+1-555-4321",
    "position": "Supervisor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Fixed per day",
    "location": "Houston",
    "coordinates": ""
  },
  {
    "id": 5,
    "firstname": "Chris",
    "lastname": "Brown",
    "phoneNumber": "+1-555-6789",
    "position": "Instructor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Per km",
    "location": "Miami",
    "coordinates": ""
  },
  {
    "id": 6,
    "firstname": "Sarah",
    "lastname": "Wilson",
    "phoneNumber": "+1-555-2345",
    "position": "Supervisor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Fixed per day",
    "location": "Seattle",
    "coordinates": ""
  },
  {
    "id": 7,
    "firstname": "James",
    "lastname": "Taylor",
    "phoneNumber": "+1-555-9876",
    "position": "Instructor",
    "perday": "10",
    "persession": "20",
    "fuelRate": "Per km",
    "location": "Boston",
    "coordinates": ""
  }
];




const TeamDataTable = ({ id, getAPIData, strAPIName }) => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [errorRows, setErrorRows] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    persession: "",
    perday: "",
    fuelRate: ""
  });

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
    if (
      !newRow.firstname ||
      !newRow.lastname ||
      !newRow.phoneNumber ||
      !newRow.position ||
      !newRow.perday ||
      !newRow.persession ||
      !newRow.fuelRate ||
      !newRow.location ||
      !newRow.coordinates
    ) {
      alert('Please Fill Required Fields');
      setErrorRows(newRow);
      return null;
    } else {
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
  };


  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const getRowClassName = (params) => {
    if (errorRows && errorRows.id == params.id) {
      return 'error-row';
    }
    return '';
  };
  const handleSearch = () => {
    var filteredRows = initialRows.filter((row) => {
      const matchesFirstName =
        formData.firstName ? row.firstName.toLowerCase().includes(formData.firstName.toLowerCase()) : true;
      const matchesLastName =
        formData.lastName ? row.lastName.toLowerCase().includes(formData.lastName.toLowerCase()) : true;
      const matchesPhoneNumber =
        formData.phoneNumber ? row.phoneNumber.toLowerCase().includes(formData.phoneNumber.toLowerCase()) : true;
      const matchesLocation =
        formData.location ? row.location.toLowerCase().includes(formData.location.toLowerCase()) : true;
      const matchesPersession =
        formData.persession ? row.persession == formData.persession : true;
      const matchesPerday =
        formData.perday ? row.perday == formData.perday : true;
      const matchesFuelRate =
        formData.fuelRate.name ? row.fuelRate.toLowerCase().includes(formData.fuelRate.name.toLowerCase()) : true;

      return (
        matchesFirstName &&
        matchesLastName &&
        matchesPhoneNumber &&
        matchesLocation &&
        matchesPersession &&
        matchesPerday &&
        matchesFuelRate
      );
    });

    if (filteredRows.length !== 0) {
      setRows(filteredRows);
    }
  };
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
  const columns = [
    {
      field: 'add',
      type: 'add',
      headerName: '',
      width: 10,
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
    },

    { field: "firstname", headerName: "First Name", width: 180, editable: true },
    { field: "lastname", headerName: "Last Name", width: 180, editable: true },
    { field: "phoneNumber", headerName: "Phone Number", width: 180, editable: true },
    { field: "location", headerName: "Location", width: 180, editable: true },
    { field: "coordinates", headerName: "Coordinates", width: 180, editable: true },
    { field: "perday", headerName: "Per Day", width: 180, editable: true },
    { field: "persession", headerName: "Per Session", width: 180, editable: true },
    { field: "fuelRate", headerName: "Fuel Rate", width: 180, editable: true }
  ]


  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;




    return (
      <GridToolbarContainer>

      </GridToolbarContainer>
    );
  }
  return (
    <div className='container-fluid'>
      <Row>

        <Col md={3} >
          <Row className="p-3">
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>First Name</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                className="form-control-noborder"
                type="text"
                name="firstname"
                rows={3}
                value={formData.firstname}
                onChange={(e) => setFormData({
                  ...formData,
                  [e.target.name]: e.target.value
                })}
              />
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row className="p-3">
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Last Name</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="lastname"
                  rows={3}
                  value={formData.lastname}
                  onChange={(e) => setFormData({
                    ...formData,
                    [e.target.name]: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>Phone #</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                className="form-control-noborder"
                type="text"
                name="phoneNumber"
                rows={3}
                value={formData.phoneNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  [e.target.name]: e.target.value
                })}
              />
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>Location</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                className="form-control-noborder"
                type="text"
                name="location"
                rows={3}
                value={formData.location}
                onChange={(e) => setFormData({
                  ...formData,
                  [e.target.name]: e.target.value
                })}
              />
            </Col>
          </Row>
        </Col>

      </Row>
      <Row>

        <Col md={3}>
          <Row className="p-3">
            <Col md={9}>
              <Form.Check
                type="checkbox"
                id="perday"
                label="Per Day"
              />
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row className="p-3">
            <Col md={9}>
              <Form.Check
                type="checkbox"
                id="persession"
                label="Per Session"
              />
            </Col>
          </Row>
        </Col>
        <Col md={3}>
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>Fuel Rate</Form.Label>
            </Col>
            <Col md={9}>
              <DropDown
                defaultOption="fuelRate"
                className="form-control-noborder form-control"
                id="fuelRate"
                getAPIData={true}
                strAPIName="GetIncomeSource"
                onSelect={(selectedValue) => setFormData({ ...formData, category: selectedValue })}
              />
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Button className='search-btn m-3' onClick={() => handleSearch()}><FontAwesomeIcon icon={faSearch} /></Button>
          <Button className='save-btn' > <FontAwesomeIcon icon={faSave} />  Save </Button>
        </Col>
      </Row>
      <div style={{ height: 500, width: '100%' }}>
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
          getRowClassName={getRowClassName}
          onProcessRowUpdateError={(error) => console.log(error)}
          experimentalFeatures={{ newEditingApi: true }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#35538894',
              color: '#fff'
            },
          }} />
      </div>
    </div>
  );
}
export default TeamDataTable;