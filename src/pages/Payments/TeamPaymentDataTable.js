import React, { useEffect, useState } from 'react';
import axios from "axios";
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import { Row, Col, Form, Button } from 'react-bootstrap';
import DatePicker from '../../components/Date/CustomDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faPen, faTrash, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { GridRowModes, DataGrid, GridToolbarContainer, GridActionsCellItem, GridRowEditStopReasons } from '@mui/x-data-grid';

var incomeData = [
  {
    "id": 1,
    "date": new Date("2025-02-02"),
    "name": "MarieLyn Daoud",
    "type": "Rabieh",
    "location": "Class",
    "nbKids": "6",
    "transport": "200",
    "nbAttendedSessions": 1

  },
  {
    "id": 2,
    "date": new Date("2025-02-03"),
    "name": "Tia Esteapnian",
    "type": "Rabieh",
    "location": "Class",
    "nbKids": "10",
    "transport": "100",
    "nbAttendedSessions": 4

  },
  {
    "id": 3,
    "date": new Date("2025-03-15"),
    "name": "Jad Daoud",
    "type": "Rabieh",
    "location": "Class",
    "nbKids": "8",
    "transport": "180",
    "nbAttendedSessions": 3

  }
];

const TeamPaymentDataTable = ({ id, getAPIData, strAPIName }) => {
  const [rows, setRows] = useState(incomeData);
  const [initialRows, setInitialRows] = useState(incomeData);
  const [rowModesModel, setRowModesModel] = useState({});
  const [errorRows, setErrorRows] = useState([]);
  const [formData, setFormData] = useState({
    from: new Date().setDate(1),
    to: new Date(),
    name: ''
  });

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

  const getRowClassName = (params) => {
    if (errorRows && errorRows.id == params.id) {
      return 'error-row';
    }
    return '';
  };
  const handleSearch = () => {
    var filteredRows = initialRows.filter((row) => {
      const rowDate = new Date(row.date);
      rowDate.setHours(0, 0, 0, 0);

      const fromDate = formData.from ? new Date(formData.from) : null;
      const toDate = formData.to ? new Date(formData.to) : null;

      const matchesFrom = fromDate ? rowDate >= fromDate : true;
      const matchesTo = toDate ? rowDate <= toDate : true;

      const matchesName = formData.name
        ? (row.name || "").toLowerCase().includes(formData.name.toLowerCase())
        : true;

      return matchesFrom && matchesTo && matchesName;
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
    if (!newRow.date || !newRow.category || !newRow.subcategory || !newRow.amount) {
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
  const handleAddClick = () => {
    const maxId = Math.max(...rows.map(row => row.id), 0);
    const newId = maxId + 1;
    const newRow = {
      "date": "",
      "name": "",
      "type": "",
      "location": "",
      "nbKids": "",
      "transport": "",
      "nbAttendedSessions": "",
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
    { field: "id", hide: true },
    { field: "date", headerName: "Date", width: 180, editable: true, type: 'date' },
    {
      field: "name", headerName: "Instructor", width: 180, editable: true
    },
    {
      field: "type", headerName: "Payment Type", width: 180, type: "singleSelect", editable: true,
      valueOptions: ["Fixed Amount", "Per session"]
    },
    {
      field: "location", headerName: "Location", width: 180, editable: true
    },
    { field: "transport", headerName: "Transport Amount", width: 180, editable: true },
    { field: "nbAttendedSessions", headerName: "Attended Sessions", width: 180, editable: true },


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
        <Col md={3}>
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>From</Form.Label>
            </Col>
            <Col md={9}>
              <DatePicker
                className="form-control-noborder form-control"
                placeholderText="dd/mm/yy"
                value={formData.from}
                showTime={false}
                onChange={(from) => setFormData({ ...formData, from })}

              />
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>To</Form.Label>
            </Col>
            <Col md={9}>
              <DatePicker
                className="form-control-noborder form-control"
                placeholderText="dd/mm/yy"
                showTime={false}
                value={formData.to}
                onChange={(to) => setFormData({ ...formData, to })}
              />
            </Col>
          </Row>
        </Col>
        <Col md={3} >
          <Row className="p-3">
            <Col md={3} className="d-flex align-items-center">
              <Form.Label className='my-3'>Name</Form.Label>
            </Col>
            <Col md={9}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Control
                  className="form-control-noborder"
                  type="text"
                  name="name"
                  rows={3}
                  value={formData.name}
                  onChange={(e) => setFormData({
                    ...formData,
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
    </div>
  );
}
export default TeamPaymentDataTable;