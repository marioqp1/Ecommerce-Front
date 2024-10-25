import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createDrug, deleteDrug, getDrugs } from './api';
import './css/ManageDrugs.css'; // Import the CSS file

const ManageDrugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newDrug, setNewDrug] = useState({
    activeIngredientId: '',
    categoryId: '',
    drugName: '',
    description: '',
    logo: ''
  });
  const [imageFile, setImageFile] = useState(null); // State to store the selected file

  useEffect(() => {
    const fetchDrugs = async () => {
      const response = await getDrugs();
      setDrugs(response.data.data); // Assuming your response structure
    };
    const fetchActiveIngredients = async () => {
      const response = await axios.get('https://grad-ecommerce-production.up.railway.app/api/activeIngredient');
      setActiveIngredients(response.data.data); // Assuming your response structure
    };
    const fetchCategories = async () => {
      const response = await axios.get('https://grad-ecommerce-production.up.railway.app/api/category');
      setCategories(response.data.data); // Assuming your response structure
    };
    fetchDrugs();
    fetchActiveIngredients();
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUploadImage = async () => {
    console.log("image not uploaded");
    if (!imageFile) return null;
    console.log("image not null");
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

  const handleAddDrug = async (e) => {
    e.preventDefault();
    const imageURL = await handleUploadImage();
    if (imageURL) {
      try {
        const drugData = { ...newDrug, logo: imageURL };
        const response = await createDrug(drugData);
        console.log(response.data);
        setDrugs([...drugs, response.data.data]); // Update state with new drug
        setNewDrug({
          activeIngredientId: '',
          categoryId: '',
          drugName: '',
          description: '',
          logo: ''
        });
        setImageFile(null);
      } catch (error) {
        console.error('Error adding drug:', error);
      }
    }
  };

  const handleDeleteDrug = async (id) => {
    try {
      await deleteDrug(id);
      setDrugs(drugs.filter(drug => drug.id !== id)); // Remove deleted drug from state
    } catch (error) {
      console.error('Error deleting drug:', error);
    }
  };

  return (
    <div className="manage-drugs">
      <h2>Manage Drugs</h2>
      <h3>Add New Drug</h3>
      <form onSubmit={handleAddDrug} className="drug-form">
        <select value={newDrug.activeIngredientId} onChange={(e) => setNewDrug({ ...newDrug, activeIngredientId: e.target.value })}>
          <option value="">Select Active Ingredient</option>
          {activeIngredients.map(ingredient => (
            <option key={ingredient.id} value={ingredient.id}>{ingredient.activeIngredient}</option>
          ))}
        </select>
        <select value={newDrug.categoryId} onChange={(e) => setNewDrug({ ...newDrug, categoryId: e.target.value })}>
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.categoryName}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Drug Name" 
          value={newDrug.drugName} 
          onChange={(e) => setNewDrug({ ...newDrug, drugName: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newDrug.description} 
          onChange={(e) => setNewDrug({ ...newDrug, description: e.target.value })} 
        />
        <input 
          type="file" 
          onChange={handleFileChange} 
        />
        <button type="submit">Add Drug</button>
      </form>
      <ul className="drug-list">
        {drugs.map(drug => (
          <li key={drug.id} className="drug-item">
            <h3>{drug.drugName}</h3>
            <p>{drug.description}</p>
            {drug.logo && <img src={drug.logo} alt={drug.drugName} className="drug-logo" />}
            <button onClick={() => handleDeleteDrug(drug.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageDrugs;
