import { Patient } from '../types/Patient';

// Update mockPatients to adhere to the Patient interface
const mockPatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: new Date('1980-01-15'),
    status: 'Active',
    address: '123 Main St, Anytown, USA',
    extraFields: ''
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: new Date('1992-05-22'),
    status: 'Onboarding',
    address: '456 Elm St, Othertown, USA',
    extraFields: ''
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Johnson',
    dateOfBirth: new Date('1975-11-30'),
    status: 'Active',
    address: '789 Oak Ave, Somewhere, USA',
    extraFields: ''
  }
];


// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API function to get all patients
export const getPatients = async (): Promise<Patient[]> => {
  await delay(500); // Simulate network delay
  return mockPatients;
};

// Mock API function to get a patient by ID
export const getPatientById = async (id: string): Promise<Patient | undefined> => {
  await delay(300); // Simulate network delay
  return mockPatients.find(p => p.id === id);
};

// Mock API function to add a new patient
export const addPatient = async (patient: Omit<Patient, 'id'>): Promise<Patient> => {
  await delay(400); // Simulate network delay
  const newPatient = {
    ...patient,
    id: (mockPatients.length + 1).toString()
  };
  mockPatients.push(newPatient);
  return newPatient;
};

// Mock API function to update a patient
export const updatePatient = async (patient: Patient): Promise<Patient> => {
  await delay(400); // Simulate network delay
  const index = mockPatients.findIndex(p => p.id === patient.id);
  if (index !== -1) {
    mockPatients[index] = patient;
    return patient;
  } else {
    throw new Error('Patient not found');
  }
};

