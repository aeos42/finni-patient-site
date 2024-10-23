import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PatientDetail from './components/PatientDetail';
import AddPatient from './components/AddPatient'; // Add this import

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/patient/:patientId" element={<PatientDetail />} />
        <Route path="/patient/new" element={<AddPatient />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
