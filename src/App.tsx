import React, { useState, useEffect } from 'react';
import './App.css';
import { Patient } from './types/Patient';

import { DataGrid } from '@mui/x-data-grid';
import { getPatients } from './services/api';

function App() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={patients}
        columns={[
          { field: 'id', headerName: 'ID', width: 70 },
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
      />
    </div>
  );
}

export default App;
