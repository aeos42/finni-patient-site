import { Patient } from './types/Patient';

export const mockPatients: Patient[] = [
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
  