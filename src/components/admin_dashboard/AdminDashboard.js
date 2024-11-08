import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/AdminDashboard.css'; // Import the CSS file for styling

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-buttons">
        <button onClick={() => navigate('/admin-dashboard/manage-drugs')} className="dashboard-button">Manage Drugs</button>
        <button onClick={() => navigate('/admin-dashboard/manage-active-ingredients')} className="dashboard-button">Manage Active Ingredients</button>
        <button onClick={() => navigate('/admin-dashboard/manage-categories')} className="dashboard-button">Manage Categories</button>
      </div>

      {/* Blue bar footer */}
      <div className="dashboard-footer"></div>
    </div>
  );
};

export default AdminDashboard;
