import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('https://grad-ecommerce-production.up.railway.app/api/category', {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setCategories(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized, redirecting to login...');
          navigate('/login');
        }
      });
  }, [navigate, token]);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, { state: { categoryName } });
  };

  return (
    <div className="container">
      <h1>Categories</h1>
      <ul className="categories-list">
        {categories.map(category => (
          <li key={category.id} onClick={() => handleCategoryClick(category.id, category.categoryName)}>
            <img src={category.logo} alt={category.categoryName} />
            <p>{category.categoryName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
