import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signin-signup/Signup';
import Login from './components/signin-signup/Login';
import CategoriesPage from './components/user_view/CategoriesPage';
import DrugsPage from './components/user_view/DrugsPage';
import AdminDashboard from './components/admin_dashboard/AdminDashboard';
import ManageDrugs from './components/admin_dashboard/ManageDrugs';
import ManageActiveIngredients from './components/admin_dashboard/ManageActiveIngredients';
import ManageCategories from './components/admin_dashboard/ManageCategories';
import ManageBranches from './components/company_dashboard/ManageBranches';
import CompanyDashboard from './components/company_dashboard/CompanyDashboard';
import ManageInventoryDrugs from './components/company_dashboard/ManageInventoryDrugs';

// import DrugsForm from './components/admin_dashboard/Drugs';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:categoryId" element={<DrugsPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/manage-drugs" element={<ManageDrugs />} />
        <Route path="/admin-dashboard/manage-active-ingredients" element={<ManageActiveIngredients />} />
        <Route path="/admin-dashboard/manage-categories" element={<ManageCategories />} />
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/company-dashboard/manage-inventory" element={<ManageInventoryDrugs />} />
        <Route path="/company-dashboard/manage-branches" element={<ManageBranches />} />
        
        {/* <Route path="/admin-dashboard/test" element={<DrugsForm />} /> */}
        
      </Routes>
    </Router>
  );
};

export default App;
