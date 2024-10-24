// CategoriesPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/styles.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the token from localStorage (or sessionStorage)

  // Fetch all categories when component mounts
  console.log(token)
  useEffect(() => {
    axios.get('https://grad-ecommerce-production.up.railway.app/api/category', {
      headers: {
        // You have commented out the Authorization token, so this is intentionally left blank
        // Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setCategories(response.data.data); // assuming the categories are inside `data`
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          console.log('Unauthorized, redirecting to login...');
          navigate('/login');
        }
      });
  }, [navigate, token]);

  // Navigate to drugs page when category is clicked, passing the categoryId and categoryName
  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/category/${categoryId}`, { state: { categoryName } });
  };

  return (
    <div>
      <h1>Categories</h1>
      <ul className="categories-list">
        {categories.map(category => (
          <li key={category.id} onClick={() => handleCategoryClick(category.id, category.categoryName)}>
            <img src={category.logo} alt={category.categoryName} width={50} />
            {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
