import { Patient } from './types/Patient';

export const mockPatients: Patient[] = [
    {
      patientId: '7f9c2e3a-8b6d-4f1c-9e5a-2d3b8c7f1a0e',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1980-01-15'),
      status: 'Active',
      address: '123 Main St, Anytown, USA',
      extraFields: {
        phoneNumber: '555-123-4567',
      }
    },
    {
      patientId: 'c4a6b8d0-9e2f-4a1d-8c3b-7f5e1d9a2c4b',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1992-05-22'),
      status: 'Onboarding',
      address: '456 Elm St, Othertown, USA',
      extraFields: {}
    },
    {
      patientId: 'f1e3d5c7-b9a8-4d2e-6f0c-1a3b5d7e9f2c',
      firstName: 'Bob',
      lastName: 'Johnson',
      dateOfBirth: new Date('1975-11-30'),
      status: 'Active',
      address: '789 Oak Ave, Somewhere, USA',
      extraFields: {}
    }
  ];
  