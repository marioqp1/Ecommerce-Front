import React, { useState, useEffect, useRef } from 'react';
import { createActiveIngredient, deleteActiveIngredient, getActiveIngredients } from './api';
import './css/ManageActiveIngredients.css'; // Import the CSS file for active ingredients

const ManageActiveIngredients = () => {
  const [activeIngredients, setActiveIngredients] = useState([]);
  const [newActiveIngredient, setNewActiveIngredient] = useState({
    activeIngredient: '',
    ingredientArabicName: '',
    description: ''
  });
  const [isAdding, setIsAdding] = useState(false); // Track adding state
  const [deletingId, setDeletingId] = useState(null); // Track deleting state
  const descriptionRef = useRef(null); // Reference for the description textarea

  useEffect(() => {
    const fetchActiveIngredients = async () => {
      try {
        const response = await getActiveIngredients();
        setActiveIngredients(response.data.data); // Assuming your response structure
      } catch (err) {
        console.error('Error fetching active ingredients:', err);
      }
    };
    fetchActiveIngredients();
  }, []);

  const handleAddActiveIngredient = async (e) => {
    e.preventDefault();
    try {
      setIsAdding(true);
      const response = await createActiveIngredient(newActiveIngredient);
      setActiveIngredients((prevState) => [...prevState, response.data.data]); // Update state with new active ingredient
      setNewActiveIngredient({
        activeIngredient: '',
        ingredientArabicName: '',
        description: ''
      });

      // Reset the description field height after adding the ingredient
      if (descriptionRef.current) {
        descriptionRef.current.style.height = '50px'; // Reset to the normal size after submit
      }
    } catch (error) {
      console.error('Error adding active ingredient:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteActiveIngredient = async (id) => {
    setDeletingId(id); // Set the id of the ingredient being deleted
    try {
      await deleteActiveIngredient(id);
      setActiveIngredients((prevState) => prevState.filter(ingredient => ingredient.id !== id)); // Remove deleted active ingredient from state
    } catch (error) {
      console.error('Error deleting active ingredient:', error);
    } finally {
      setDeletingId(null); // Reset the deleting state
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewActiveIngredient({ ...newActiveIngredient, [name]: value });

    // Expand the description textarea as the user types
    if (name === 'description' && descriptionRef.current) {
      descriptionRef.current.style.height = 'auto'; // Reset height to auto to shrink it
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`; // Set the height to match content
    }
  };

  return (
    <div className="manage-active-ingredients" style={{ backgroundColor: "#f9f9f9", padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center" }}>Manage Active Ingredients</h2>
      <h3 style={{ textAlign: "center" }}>Add New Active Ingredient</h3>
      <form onSubmit={handleAddActiveIngredient} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input 
          type="text" 
          name="activeIngredient" 
          placeholder="Active Ingredient" 
          value={newActiveIngredient.activeIngredient} 
          onChange={handleChange} 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input 
          type="text" 
          name="ingredientArabicName" 
          placeholder="Ingredient Arabic Name" 
          value={newActiveIngredient.ingredientArabicName} 
          onChange={handleChange} 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newActiveIngredient.description}
          onChange={handleChange}
          ref={descriptionRef} // Attach the ref to the textarea
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "none", // Disable manual resizing
            height: '50px', // Initial height
            minHeight: "50px", // Minimum height of the textarea
            overflow: "hidden", // Hide overflow as it expands
          }}
        />
        <button 
          type="submit" 
          style={{ padding: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : 'Add Active Ingredient'}
        </button>
      </form>
      <ul className="active-ingredient-list" style={{ marginTop: "20px" }}>
        {activeIngredients.map(ingredient => (
          <li 
            key={ingredient.id} 
            className="active-ingredient-item" 
            style={{
              marginBottom: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              backgroundColor: "#fff",
              width: '100%', // Fixed width for ingredient list
              maxWidth: '100%',
              wordWrap: 'break-word', // Ensure text stays inside the container
            }}
          >
            <h3>{ingredient.activeIngredient}</h3>
            <p>{ingredient.ingredientArabicName}</p>
            <p>{ingredient.description}</p>
            <button 
              onClick={() => handleDeleteActiveIngredient(ingredient.id)} 
              style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
              disabled={isAdding}
            >
              {deletingId === ingredient.id ? 'Deleting ingredient...' : 'Delete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageActiveIngredients;
