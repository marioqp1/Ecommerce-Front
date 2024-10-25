import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CompanyDashboard.css'; // Import the CSS file for styling

const CompanyDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="company-dashboard">
      <h2>Company Dashboard</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/company-dashboard/manage-branches')}>Manage Branches</button>
        <button onClick={() => navigate('/company-dashboard/manage-inventory')}>Manage Inventory</button>
      </div>
    </div>
  );
};

export default CompanyDashboard;
