import { newPatient, Patient } from '../types/Patient';

const API_BASE_URL = 'http://localhost:3000';

export const getPatients = async (): Promise<Patient[]> => {
  try {
    console.log(`Fetching patients from ${API_BASE_URL}/patients`);
    const response = await fetch(`${API_BASE_URL}/patients`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

export const getPatientById = async (
  patientId: string,
): Promise<Patient | undefined> => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients/${patientId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching patient with id ${patientId}:`, error);
    throw error;
  }
};

export const addPatient = async (patient: newPatient): Promise<Patient> => {
  try {
    const response = await fetch(`${API_BASE_URL}/patients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patient),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding patient:', error);
    throw error;
  }
};

export const updatePatient = async (patient: Patient): Promise<Patient> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/patients/${patient.patientId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patient),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating patient:', error);
    throw error;
  }
};

export const deletePatient = async (patientId: string): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/patients/${patientId}`, { method: 'DELETE' });
  } catch (error) {
    console.error(`Error deleting patient with id ${patientId}:`, error);
    throw error;
  }
};
