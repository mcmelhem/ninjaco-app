import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel, faSearch, faBook } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import CoursesPackagesDataTable from "./CoursesPackagesDataTable";
import DropDown from '../../components/DropDown/CustomDropDown';
import { Checkbox, Box } from '@mui/material';

var initialRows = [
  {
    "id": 1,
    "centerName": "Sunshine Academy",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1-555-1234",
    "location": "New York",
    "type": "Home Session",
    "coordinates": "",
    "paymentType": "Per kid per session",
    "saveAttendance": false
  },
  {
    "id": 2,
    "centerName": "Innovative Learning Hub",
    "firstName": "Jane",
    "lastName": "Smith",
    "phone": "+1-555-5678",
    "location": "Los Angeles",
    "coordinates": "",
    "type": "Center",
    "paymentType": "Per package (percentage)",
    "saveAttendance": false
  },
  {
    "id": 3,
    "centerName": "Future Scholars Center",
    "firstName": "Michael",
    "lastName": "Johnson",
    "phone": "+1-555-8765",
    "location": "Chicago",
    "coordinates": "",
    "type": "School",
    "paymentType": "Per session",
    "saveAttendance": false
  },
  {
    "id": 4,
    "centerName": "Creative Minds Studio",
    "firstName": "Emily",
    "lastName": "Davis",
    "phone": "+1-555-4321",
    "location": "Houston",
    "coordinates": "",
    "type": "Summer Camp",
    "paymentType": "Fixed Amount",
    "saveAttendance": false
  }
];


const CentersDataTable = ({ id, getAPIData, strAPIName }) => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [errorRows, setErrorRows] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    centerName: "",
    paymentType: "",
    centerType: ""
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

  const getRowClassName = (params) => {
    if (errorRows && errorRows.id == params.id) {
      return 'error-row';
    }
    return '';
  };
  const handleSearch = () => {
    var filteredRows = initialRows.filter((row) => {
      const matchesCenterType =
        formData.centerType.name ? row.type.toLowerCase().includes(formData.centerType.name.toLowerCase()) : true;
      const matchesPaymentType =
        formData.paymentType.name ? row.centerName.toLowerCase().includes(formData.paymentType.name.toLowerCase()) : true;
      const matchesCenterName =
        formData.centerName ? row.centerName.toLowerCase().includes(formData.centerName.toLowerCase()) : true;

      return (matchesCenterType && matchesPaymentType && matchesCenterName);
    });

    if (filteredRows.length != 0) {
      setRows(filteredRows)
    }

  }
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
    if (!newRow.centerName || !newRow.firstName || !newRow.lastName || !newRow.phone || !newRow.location ||
      !newRow.coordinates || !newRow.type || !newRow.paymentType || !newRow.saveAttendance) {
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

  const handleShowCourses = (id) => {
    handleShow();

  }
  const handleAddClick = () => {
    const maxId = Math.max(...rows.map(row => row.id), 0);
    const newId = maxId + 1;
    const newRow = {
      "centerName": "",
      "firstName": "",
      "lastName": "",
      "phone": "",
      "location": "",
      "coordinates": "",
      "type": "",
      "paymentType": "",
      "saveAttendance": "",
      "id": newId,
      "isNew": true
    };
    setRows((oldRows) => [
      ...oldRows,
      newRow,
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'date' },
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
    {
      field: 'coursespackages',
      type: 'actions',
      headerName: 'Courses',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ name }) => {
        return [
          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faBook} />}
            label="Show Courses and Packages"
            className="grid-btn"
            onClick={() => handleShowCourses(name)}
          />

        ];
      }

    },
    { field: "centerName", headerName: "Center Name", width: 180, editable: true },
    { field: "firstName", headerName: "Owner First Name", width: 150, editable: true },
    { field: "lastName", headerName: "Owner Last Name", width: 150, editable: true },
    { field: "phone", headerName: "Phone Number", width: 180, editable: true },
    { field: "location", headerName: "Location", width: 180, editable: true },
    { field: "coordinates", headerName: "Coordinates", width: 180, editable: true },
    {
      field: "type", headerName: "Type", width: 180, type: "singleSelect", editable: true,
      valueOptions: [
        "school", "Homesession", "Center"
      ]
    },
    {
      field: "paymentType", headerName: "Payment Type", width: 180, type: "singleSelect", editable: true,
      valueOptions: [
        "Fixed Amount", "Per session"
      ]
    },
    {
      field: "saveAttendance", headerName: "Save Attendance", width: 180, type: "singleSelect", editable: true,
      renderCell: (params) => {
        return (
          <Checkbox
            checked={params.value}
          /* onChange={(e) => handleCheckboxChange(e, params.row.id)}*/
          />
        );
      }

    }

  ]

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleAddClick = () => {
      const maxId = Math.max(...rows.map(row => row.id), 0);
      const newId = maxId + 1;
      const newRow = {
        "centerName": "",
        "firstName": "",
        "lastName": "",
        "phone": "",
        "location": "",
        "coordinates": "",
        "type": "",
        "paymentType": " ",
        "saveAttendance": "",
        "id": newId,
        "isNew": true
      };
      setRows((oldRows) => [
        ...oldRows,
        newRow,
      ]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [newId]: { mode: GridRowModes.Edit, fieldToFocus: 'centerName' },
      }));
    };


    return (
      <GridToolbarContainer>

      </GridToolbarContainer>
    );
  }
  return (
    <div className='container-fluid'>
      <Row>
        <Col md={3}>
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>Name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Control
                className="form-control-noborder"
                type="text"
                name="centername"
                rows={3}
                value={formData.centername}
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
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>Type</Form.Label>
            </Col>
            <Col md={9}>
              <DropDown
                defaultOption="centerType"
                className="form-control-noborder form-control"
                id="centerType"
                getAPIData={true}
                strAPIName="GetIncomeSource"
                onSelect={(selectedValue) => setFormData({ ...formData, category: selectedValue })}
              />
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row className="p-3">
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Payment Type</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="description">
                <DropDown
                  defaultOption="paymentType"
                  className="form-control-noborder form-control"
                  id="paymentType"
                  getAPIData={true}
                  strAPIName="GetIncomeSource"
                  onSelect={(selectedValue) => setFormData({ ...formData, category: selectedValue })}
                />
              </Form.Group>
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
          getRowClassName={getRowClassName}
          slotProps={{
            toolbar: { setRows, setRowModesModel }
          }}
          onProcessRowUpdateError={(error) => { }}
          experimentalFeatures={{ newEditingApi: true }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#35538894',
              color: '#fff'
            },
          }}
          showToolbar />
      </div>
      <div id='coursesPackages' className='m-1'>

        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title className='modal-courses-title'>Courses and Packages</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{ height: 500, width: '100%' }}>
              <CoursesPackagesDataTable></CoursesPackagesDataTable>
            </div>
          </Modal.Body>
          <Modal.Footer>

            <Button className="save-btn" onClick={() => alert('Confirmed')}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
};

export default CentersDataTable;
