import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCategory, deleteCategory, getCategories } from './api';
import './css/ManageCategories.css'; // Import the CSS file for categories

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    categoryName: '',
    logo: ''
  });
  const [imageFile, setImageFile] = useState(null); // State to store the selected file

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data.data); // Assuming your response structure
    };
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append('imageFile', imageFile);

    try {
      const response = await axios.post('https://grad-ecommerce-production.up.railway.app/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const imageURL = await handleUploadImage();
    if (imageURL) {
      try {
        const categoryData = { ...newCategory, logo: imageURL };
        const response = await createCategory(categoryData);
        console.log(response.data);
        setCategories([...categories, response.data.data]); // Update state with new category
        setNewCategory({
          categoryName: '',
          logo: ''
        });
        setImageFile(null);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id)); // Remove deleted category from state
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="manage-categories">
      <h2>Manage Categories</h2>
      <h3>Add New Category</h3>
      <form onSubmit={handleAddCategory} className="category-form">
        <input 
          type="text" 
          placeholder="Category Name" 
          value={newCategory.categoryName} 
          onChange={(e) => setNewCategory({ ...newCategory, categoryName: e.target.value })} 
        />
        <input 
          type="file" 
          onChange={handleFileChange} 
        />
        <button type="submit">Add Category</button>
      </form>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            <h3>{category.categoryName}</h3>
            {category.logo && <img src={category.logo} alt={category.categoryName} className="category-logo" />}
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
