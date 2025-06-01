import React, { useEffect, useState } from 'react';
import DatePicker from '../../components/Date/CustomDate';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash, faSave, faCancel, faSearch, faEye } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';
import StudentAddModal from './StudentAddModal';

const initialRows = [
  {
    id: 1,

    firstname: 'John',
    lastname: 'Doe',
    parent: 'Market',
    phone: '123-456-7890',
    course: 'Mathematics',
    package: 'Basic',
    center: 'Downtown Center'
  },
  {
    id: 2,

    firstname: 'Jane',
    lastname: 'Smith',
    parent: 'Market',
    phone: '987-654-3210',
    course: 'Physics',
    package: 'Premium',
    center: 'Uptown Center'
  }
];
const studentArchiveRows = [
  {
    id: 1,
    date: 'John',
    course: 'Doe',
    activity: 'Market',
    note: '123-456-7890'
  },
  {
    id: 2,
    date: 'John',
    course: 'Doe',
    activity: 'Market',
    note: '123-456-7890'
  }
];
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleAddClick = () => {
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
      <Button className='saveBtn' onClick={handleAddClick}>
        <FontAwesomeIcon icon={faPlus} />   Add
      </Button>
      <Button className='saveBtn' onClick={handleAddClick}>
        <FontAwesomeIcon icon={faSave} />  Save
      </Button>
    </GridToolbarContainer>
  );
}

const StudentsDataTable = ({ id, getAPIData, strAPIName }) => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [studentArchiveRow, setstudentArchiveRows] = useState(studentArchiveRows);
  const [studentArchiveRowModesModel, setstudentArchiveRowModesModel] = useState({});
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [studentsSearch, setstudentsSearch] = useState({
    firstName: '',
    lastName: '',
    parentName: '',
    phoneNumber: '',
    course: '',
    package: '',
    center: ''

  });

  const handleSearch = () => {
    var filteredRows = initialRows.filter((row) => {
      const matchesFirstName =
        studentsSearch.firstName ? row.firstName.toLowerCase().includes(studentsSearch.firstName.toLowerCase()) : true;
      const matchesLastName =
        studentsSearch.lastName ? row.lastName.toLowerCase().includes(studentsSearch.lastName.toLowerCase()) : true;
      const matchesParentName =
        studentsSearch.parentName ? row.parentName.toLowerCase().includes(studentsSearch.parentName.toLowerCase()) : true;
      const matchesPhoneNumber =
        studentsSearch.phoneNumber ? row.phoneNumber.toLowerCase().includes(studentsSearch.phoneNumber.toLowerCase()) : true;
      const matchesCourse =
        studentsSearch.course ? row.course.toLowerCase().includes(studentsSearch.course.toLowerCase()) : true;
      const matchesPackage =
        studentsSearch.package ? row.package.toLowerCase().includes(studentsSearch.package.toLowerCase()) : true;
      const matchesCenter =
        studentsSearch.center ? row.center.toLowerCase().includes(studentsSearch.center.toLowerCase()) : true;

      return (
        matchesFirstName &&
        matchesLastName &&
        matchesParentName &&
        matchesPhoneNumber &&
        matchesCourse &&
        matchesPackage &&
        matchesCenter
      );
    });

    if (filteredRows.length !== 0) {
      setRows(filteredRows);
    }
  };


  const addStudent = (blnShowModal) => {
    setModalTitle('Add Student');
    setIsAddStudentModalOpen(blnShowModal);
  }
  const addStudentData = (newStudent) => {
    setRows(prevRows => [...prevRows, { id: rows.length + 1, ...newStudent }]);
    /*const day = newSession.day.name;
    const time = newSession.time;
    newSession.time = day + ' @' + time;
    setSessions((prevSessions) => [
      ...prevSessions,
      { ...newSession, id: prevSessions.length + 1 }
    ]);*/
  };
  useEffect(() => {
    if (getAPIData) {
      const token = localStorage.getItem("loggedinUser");
      axios.get(API_BASE_URL + '/api/' + strAPIName, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }).then((response) => {
        if (response.data) {
          setRows(response.data);
        }
      }).catch((error) => {
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

  const handleShowStudentsDetails = (id) => {
    if (document.getElementById('studentArchive').style.display == 'none') {
      document.getElementById('studentArchive').style.display = 'block';

    } else {
      document.getElementById('studentArchive').style.display = 'none';

    }

  }

  const columns = [
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
            onClick={handleDeleteClick(id)}
            className="grid-btn"
          />
        ];
      },
    },
    {
      field: 'moredetails',
      type: 'actions',
      headerName: 'Details',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [

          <GridActionsCellItem
            icon={<FontAwesomeIcon icon={faEye} />}
            label="Show Courses and Packages"
            className="grid-btn"
            onClick={() => handleShowStudentsDetails(id)}
          />,
        ];
      }

    },
    {
      field: 'firstname',
      headerName: 'First Name',
      width: 180,
      editable: true

    },
    {
      field: 'lastname',
      headerName: 'Last Name',
      width: 180,
      editable: true,

    },
    {
      field: 'parent',
      headerName: 'Parent Name',
      width: 180,
      editable: true

    },
    {
      field: 'phone',
      headerName: 'Phone #',
      width: 180,
      editable: true,

    },
    {
      field: 'course',
      headerName: 'Course',
      editable: true,

    },
    {
      field: 'package',
      headerName: 'Package',
      width: 180,
      editable: true,

    },
    {
      field: 'center',
      headerName: 'Center',
      width: 180,
      editable: true,

    }

  ];
  const studentsArchiveColumns = [


    {
      field: 'date',
      headerName: 'Date',
      width: 180

    },
    {
      field: 'course',
      headerName: 'Course',
      width: 180,

    },
    {
      field: 'activity',
      headerName: 'Activity',
      width: 180

    },
    {
      field: 'notes',
      headerName: 'Notes',
      width: 180

    }



  ];


  return (
    <div className='container-fluid'>
      <Row>
        <Col md={3}>
          <Row >
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>First Name</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="firstName"
                  rows={3}
                  value={studentsSearch.firstName}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row >
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Last Name</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="lastName"
                  rows={3}
                  value={studentsSearch.lastName}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />
              </Form.Group>

            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row>
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Parent Name</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="description">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="parentName"
                  rows={3}
                  value={studentsSearch.parentName}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />

              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row >
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Phone #</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="phoneNum">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="phoneNum"
                  rows={3}
                  value={studentsSearch.phoneNumber}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>

      </Row >
      <Row>
        <Col md={3}>
          <Row >
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Course</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="course">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="course"
                  rows={3}
                  value={studentsSearch.course}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row>
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Package</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="package">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="package"
                  rows={3}
                  value={studentsSearch.package}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />
              </Form.Group>

            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row >
            <Col md={4} className="d-flex align-items-center">
              <Form.Label className='my-3'>Center</Form.Label>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="center">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="center"
                  rows={3}
                  value={studentsSearch.center}
                  onChange={(e) => setstudentsSearch({
                    ...studentsSearch,
                    [e.target.name]: e.target.value
                  })}
                />

              </Form.Group>
            </Col>
          </Row>
        </Col>

        <Col md={3} >

          <Button className='search-btn m-3' onClick={() => handleSearch()}><FontAwesomeIcon icon={faSearch} /></Button>
          <Button className='save-btn' > <FontAwesomeIcon icon={faSave} />  Save </Button>
          <button className='btn-add btn m-2' onClick={() => addStudent(true)}><FontAwesomeIcon icon={faPlus} /> Add Student</button>
          <StudentAddModal isOpen={isAddStudentModalOpen}
            onClose={() => addStudent(false)}
            addStudentData={addStudentData}
            title={modalTitle}>
          </StudentAddModal>
        </Col>
      </Row >
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
          onProcessRowUpdateError={(error) => console.log(error)}
          experimentalFeatures={{ newEditingApi: true }}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#35538894',
              color: '#fff'

            },
          }} />
      </div>
      <div id='studentArchive' style={{ display: 'none' }} className='m-1'>
        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={studentArchiveRows}
            columns={studentsArchiveColumns}
            editMode="row"
            rowModesModel={studentArchiveRowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setstudentArchiveRows, setstudentArchiveRowModesModel }
            }}
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
    </div >
  );
};

export default StudentsDataTable;