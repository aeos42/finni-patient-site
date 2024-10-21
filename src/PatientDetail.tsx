import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  CircularProgress,
  Button,
  IconButton
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import { Patient } from './types/Patient';
import { getPatientById, updatePatient } from './services/api';

import ButtonBar from './components/ButtonBar';
import SwitchableField from './components/SwitchableField';
import SwitchableExtraField from './components/SwitchableExtraField';
import AddCustomFieldModal from './components/AddCustomFieldModal';
import SwitchableDateField from './components/SwitchableDateField';


function PatientDetail() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (patient) {
      setEditedPatient({ ...patient });
    }
  }, [patient]);

  const handleSave = async () => {
    try {
      if (editedPatient) {
        const updatedPatient = await updatePatient(editedPatient);
        setPatient(updatedPatient);
        console.log('Patient data updated successfully:', updatedPatient);
        setEditing(false);
      } else {
        console.error('Edited patient data is null');
      }
    } catch (error) {
      console.error('Error updating patient data:', error);
    }
  };

  const handleFieldChange = (field: keyof Patient | string, value: string) => {
    if (editedPatient) {
      if (field in editedPatient) {
        // Handle regular fields
        setEditedPatient({ ...editedPatient, [field]: value });
      } else {
        // Handle extra fields
        setEditedPatient({
          ...editedPatient,
          extraFields: {
            ...editedPatient.extraFields,
            [field]: value
          }
        });
      }
    }
  };

  const handleAddCustomField = (key: string, value: string) => {
    console.log(`Adding custom field: ${key} = ${value}`);
    if (editedPatient) {
      setEditedPatient({
        ...editedPatient,
        extraFields: {
          ...editedPatient.extraFields,
          [key]: value
        }
      });
      setOpenModal(false);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (patientId) {
          console.log(`Fetching patient with id ${patientId}`);
          const data = await getPatientById(patientId);
          setPatient(data || null);
        }
        
      } catch (error) {
        console.error('Error fetching patient:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatient();
  }, [patientId]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient not found
        </Typography>
      </Container>
    );
  }


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ButtonBar>
        <Button variant="contained" onClick={() => {
          if (editing) {
            handleSave();
          }
          setEditing(!editing);
        }}>
          {editing ? 'Save' : 'Edit Patient'}
        </Button>
        {editing && <Button variant="contained" onClick={() => setEditing(!editing)}>Cancel</Button>}
      </ButtonBar>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={8}>
            <List>
              <ListItem>
                {SwitchableField(
                  editing,
                  'First Name',
                  editedPatient?.firstName || '',
                  (value: string) => handleFieldChange('firstName', value)
                )}
              </ListItem>
              <ListItem>
                {SwitchableField(
                  editing,
                  'Last Name',
                  editedPatient?.lastName || '',
                  (value: string) => handleFieldChange('lastName', value)
                )}
              </ListItem>
              <ListItem>
                {SwitchableDateField(
                  editing,
                  'DOB',
                  editedPatient?.dateOfBirth || new Date(),
                  (value: Date) => handleFieldChange('dateOfBirth', value.toISOString())
                )}
              </ListItem>
              <ListItem>
                <ListItemText primary="Status" secondary={editedPatient?.status || ''} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={editedPatient?.address || ''} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Patient ID" secondary={editedPatient?.patientId || ''} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Typography variant="h6" component="h2" gutterBottom>Custom Data Fields</Typography>
        <List>
          {Object.entries(editedPatient?.extraFields || {}).map(([key, value]) => (
            <ListItem key={key}>
              {SwitchableExtraField(
                editing,
                key,
                value,
                (value: string) => handleFieldChange(key, value)
              )}
            </ListItem>
          ))}
        </List>
        {editing && (
          <Button variant="outlined" onClick={() => setOpenModal(true)} sx={{ mt: 2 }}>
            Add Custom Field
          </Button>
        )}
      </Paper>

      <AddCustomFieldModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onAdd={handleAddCustomField}
      />
    </Container>
  );
}

export default PatientDetail;
