import React from 'react';
import { useParams } from 'react-router-dom';

function PatientDetail() {
  const { id } = useParams();

  return (
    <div>
      <h1>Patient Detail</h1>
      <p>Patient ID: {id}</p>
      {/* Add more patient details here */}
    </div>
  );
}

export default PatientDetail;
