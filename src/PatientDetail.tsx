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
  Button
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import { Patient } from './types/Patient';
import { getPatientById } from './services/api'; // You'll need to implement this function
import ButtonBar from './components/ButtonBar';

function PatientDetail() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);

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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <ButtonBar>
        <Button variant="contained">Edit Patient</Button>
      </ButtonBar>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Patient Details
        </Typography>
        <Grid container spacing={2}>
          <Grid size={8}>
            <List>
              <ListItem>
                <ListItemText primary="First Name" secondary={patient.firstName} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemText primary="Last Name" secondary={patient.lastName} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemText primary="DOB" secondary={formatDate(patient.dateOfBirth)} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemText primary="Status" secondary={patient.status} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemText primary="Address" secondary={patient.address} />
              </ListItem>
            </List>
            <List>
              <ListItem>
                <ListItemText primary="Patient ID" secondary={patient.patientId} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Typography variant="h6" component="h2" gutterBottom>Custom Data Fields</Typography>
        <List>
          {Object.entries(patient.extraFields).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={key} secondary={value} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default PatientDetail;
