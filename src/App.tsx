import React, { useState, useEffect } from 'react';
import './App.css';
import { Patient } from './types/Patient';

import { DataGrid, GridRowSelectionModel, GridToolbar } from '@mui/x-data-grid';
import { deletePatient, getPatients } from './services/api';
import { mockPatients } from './mockPatients';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';

// Check the environment variable
const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatients, setSelectedPatients] =
    useState<GridRowSelectionModel>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      if (useMockData) {
        setPatients(mockPatients);
      } else {
        const data = await getPatients();
        setPatients(data);
        console.log('Fetched patients:', data);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleRowSelection = (newSelection: GridRowSelectionModel) => {
    setSelectedPatients(newSelection);
  };

  const handleViewPatient = () => {
    if (selectedPatients.length === 1) {
      const patientId = selectedPatients[0];
      navigate(`/patient/${patientId}`);
    }
  };

  const handleAddPatient = () => {
    navigate('/patient/new');
  };

  const handleDeletePatient = () => {
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    console.log('Deleting patients:', selectedPatients);
    for (const patientId of selectedPatients) {
      await deletePatient(patientId.toString());
    }
    setOpenDeleteModal(false);
    setSelectedPatients([]);
    await fetchPatients();
  };

  const handleCancelDelete = () => {
    setOpenDeleteModal(false);
  };

  const patientsToDelete = patients.filter((patient) =>
    selectedPatients.includes(patient.patientId),
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button variant="contained" onClick={handleAddPatient}>
          Add Patient
        </Button>
        <Button
          variant="outlined"
          disabled={selectedPatients.length !== 1}
          onClick={handleViewPatient}
        >
          View Patient
        </Button>
        <Button
          variant="outlined"
          color="error"
          disabled={selectedPatients.length === 0}
          onClick={handleDeletePatient}
        >
          {selectedPatients.length <= 1
            ? 'Delete Patient'
            : 'Delete Selected Patients'}
        </Button>
      </Stack>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.patientId}
          slots={{
            toolbar: GridToolbar,
          }}
          rows={patients}
          columns={[
            { field: 'patientId', headerName: 'ID', width: 70 },
            { field: 'firstName', headerName: 'First Name', width: 130 },
            { field: 'lastName', headerName: 'Last Name', width: 130 },
            { field: 'dateOfBirth', headerName: 'Date of Birth', width: 130 },
            { field: 'status', headerName: 'Status', width: 130 },
            { field: 'address', headerName: 'Address', width: 200 },
          ]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={selectedPatients}
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
            },
            '& .MuiDataGrid-cell': {
              borderBottom: '1px solid #f0f0f0',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f5f5f5',
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: '#fff',
            },
          }}
        />
      </div>
      <DeleteConfirmationModal
        open={openDeleteModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        patientsToDelete={patientsToDelete}
      />
    </div>
  );
}

export default App;
