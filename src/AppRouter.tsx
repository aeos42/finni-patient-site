import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PatientDetail from './PatientDetail'; // You'll need to create this component

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/patient/:id" element={<PatientDetail />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
