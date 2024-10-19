export interface Patient {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  status: 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';
  address: string;
  extraFields: Record<string, any>;
  patientId: string;
}
