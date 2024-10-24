import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signin-signup/Signup';
import Login from './components/signin-signup/Login';
import CategoriesPage from './components/user_view/CategoriesPage';
import DrugsPage from './components/user_view/DrugsPage';
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<CategoriesPage />} />
        <Route path="/category/:categoryId" element={<DrugsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
