export interface newPatient {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  status: 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';
  address: string;
}

export interface Patient extends newPatient {
  extraFields: Record<string, any>;
  patientId: string;
}

