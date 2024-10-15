export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  status: 'Inquiry' | 'Onboarding' | 'Active' | 'Churned';
  address: string;
  extraFields: string;
}
