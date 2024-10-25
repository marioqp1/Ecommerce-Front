import React, { useState, useEffect } from 'react';
import { createActiveIngredient, deleteActiveIngredient, getActiveIngredients } from './api';
import './css/ManageActiveIngredients.css'; // Import the CSS file for active ingredients

const ManageActiveIngredients = () => {
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [newActiveIngredient, setNewActiveIngredient] = useState({
    activeIngredient: '',
    ingredientArabicName: '',
    description: ''
  });

  useEffect(() => {
    const fetchActiveIngredients = async () => {
      const response = await getActiveIngredients();
      setActiveIngredients(response.data.data); // Assuming your response structure
    };
    fetchActiveIngredients();
  }, []);

  const handleAddActiveIngredient = async (e) => {
    e.preventDefault();
    try {
      const response = await createActiveIngredient(newActiveIngredient);
      console.log(response.data);
      setActiveIngredients([...activeIngredients, response.data.data]); // Update state with new active ingredient
      setNewActiveIngredient({
        activeIngredient: '',
        ingredientArabicName: '',
        description: ''
      });
    } catch (error) {
      console.error('Error adding active ingredient:', error);
    }
  };

  const handleDeleteActiveIngredient = async (id) => {
    try {
      await deleteActiveIngredient(id);
      setActiveIngredients(activeIngredients.filter(ingredient => ingredient.id !== id)); // Remove deleted active ingredient from state
    } catch (error) {
      console.error('Error deleting active ingredient:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActiveIngredient({ ...newActiveIngredient, [name]: value });
  };

  return (
    <div className="manage-active-ingredients">
      <h2>Manage Active Ingredients</h2>
      <h3>Add New Active Ingredient</h3>
      <form onSubmit={handleAddActiveIngredient} className="active-ingredient-form">
        <input 
          type="text" 
          name="activeIngredient" 
          placeholder="Active Ingredient" 
          value={newActiveIngredient.activeIngredient} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="ingredientArabicName" 
          placeholder="Ingredient Arabic Name" 
          value={newActiveIngredient.ingredientArabicName} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="description" 
          placeholder="Description" 
          value={newActiveIngredient.description} 
          onChange={handleChange} 
        />
        <button type="submit">Add Active Ingredient</button>
      </form>
      <ul className="active-ingredient-list">
        {activeIngredients.map(ingredient => (
          <li key={ingredient.id} className="active-ingredient-item">
            <h3>{ingredient.activeIngredient}</h3>
            <p>{ingredient.ingredientArabicName}</p>
            <p>{ingredient.description}</p>
            <button onClick={() => handleDeleteActiveIngredient(ingredient.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageActiveIngredients;
