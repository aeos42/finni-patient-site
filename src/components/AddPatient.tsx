import React, { useState } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { newPatient, Patient } from '../types/Patient';
import { addPatient } from '../services/api';

const AddPatient: React.FC = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Partial<Patient>>({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    status: 'Inquiry',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Ensure all required fields are filled
      if (!patient.firstName || !patient.lastName || !patient.dateOfBirth || !patient.status || !patient.address) {
        throw new Error('All fields are required');
      }

      const createPatient: newPatient = {
        firstName: patient.firstName,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth,
        status: 'Inquiry',
        address: patient.address
      };

      await addPatient(createPatient);
      console.log('New patient added:', createPatient);
      navigate('/'); // Redirect to the patient list
    } catch (error) {
      console.error('Error adding patient:', error);
      // TODO: Add user-friendly error handling (e.g., display error message to user)
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
        Add New Patient
      </Typography>
      <Stack spacing={2} sx={{ maxWidth: 400, margin: 'auto' }}>
        <TextField
          name="firstName"
          label="First Name"
          value={patient.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={patient.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={patient.dateOfBirth}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          name="address"
          label="Address"
          value={patient.address}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
        <Button type="submit" variant="contained">
          Add Patient
        </Button>
        <Button variant="outlined" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Stack>
    </form>
  );
};

export default AddPatient;
