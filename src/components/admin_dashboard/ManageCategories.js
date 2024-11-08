import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createCategory, deleteCategory, getCategories } from './api';
import './css/ManageCategories.css'; 

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ categoryName: '', logo: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null); // To track the delete loading for each category

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data.data); 
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
      const response = await axios.post('https://your-api-url/upload', formData, {
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
    setLoading(true);

    const imageURL = await handleUploadImage();
    if (imageURL) {
      try {
        const categoryData = { ...newCategory, logo: imageURL };
        const response = await createCategory(categoryData);
        setCategories([...categories, response.data.data]);
        setNewCategory({ categoryName: '', logo: '' });
        setImageFile(null);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }

    setLoading(false);
  };

  const handleDeleteCategory = async (id) => {
    setDeleteLoading(id); // Set the loading state for the category being deleted
    try {
      await deleteCategory(id);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
    setDeleteLoading(null); // Reset the loading state after the operation
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
          required 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          required 
        />
        <button type="submit" disabled={loading}>
          {loading ? <span className="button-loading"></span> : 'Add Category'}
        </button>
      </form>
      
      <ul className="category-list">
        {categories.map(category => (
          <li key={category.id} className="category-item">
            <img src={category.logo} alt={category.categoryName} />
            <h3>{category.categoryName}</h3>
            <button 
              onClick={() => handleDeleteCategory(category.id)} 
              disabled={deleteLoading === category.id}
            >
              {deleteLoading === category.id ? <span className="button-loading"></span> : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCategories;
