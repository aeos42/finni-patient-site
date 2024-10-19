import React, { useState, useEffect } from 'react';
import './App.css';
import { Patient } from './types/Patient';

import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { getPatients } from './services/api';
import { mockPatients } from './mockPatients';
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Check the environment variable
const useMockData = process.env.REACT_APP_USE_MOCK_DATA === 'true';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatients, setSelectedPatients] = useState<GridRowSelectionModel>([]);
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

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button variant="contained">Add Patient</Button>
        <Button 
          variant="outlined" 
          disabled={selectedPatients.length !== 1}
          onClick={handleViewPatient}
        >
          View Patient
        </Button>
        <Button variant="outlined">Delete Patient</Button>
      </Stack>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.patientId}
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
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={handleRowSelection}
          rowSelectionModel={selectedPatients}
        />
      </div>
    </div>
  );
}

export default App;
