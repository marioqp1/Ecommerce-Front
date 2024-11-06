import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-center text-teal-800 mb-12 tracking-wide">Categories</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map(category => (
          <li 
            key={category.id} 
            onClick={() => handleCategoryClick(category.id, category.categoryName)}
            className="bg-white border border-gray-100 rounded-lg shadow-md hover:shadow-xl transform transition-all hover:scale-105 cursor-pointer p-6 text-center"
          >
            <div className="flex justify-center mb-4">
              <img 
                src={category.logo} 
                alt={category.categoryName} 
                className="w-28 h-28 object-contain rounded-lg bg-gradient-to-r from-teal-200 to-teal-400 p-2"
              />
            </div>
            <p className="text-lg font-semibold text-gray-700 tracking-wide">{category.categoryName}</p>
            <button className="mt-4 px-5 py-2 bg-teal-600 text-white font-medium rounded-md shadow-md hover:bg-blue-500 transition-colors duration-300">
              Learn More
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
