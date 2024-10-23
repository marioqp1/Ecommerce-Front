import React, { useState } from 'react';

import { addDrug } from '../../services/DrugService';

const AddDrug = () => {
  const [drug, setDrug] = useState({
    activeIngredientId: '',
    categoryId: '',
    drugName: '',
    description: '',
    logo: '',
  });
  const [token, setToken] = useState(''); // This should come from authentication

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDrug({ ...drug, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addDrug(drug, token);
      alert('Drug added successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding drug:', error);
      alert('Failed to add drug');
    }
  };

  return (
    <div>
      <h2>Add Drug</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="activeIngredientId"
          placeholder="Active Ingredient ID"
          value={drug.activeIngredientId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categoryId"
          placeholder="Category ID"
          value={drug.categoryId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="drugName"
          placeholder="Drug Name"
          value={drug.drugName}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={drug.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="logo"
          placeholder="Logo URL"
          value={drug.logo}
          onChange={handleChange}
        />
        <input
          type="text"
          name="token"
          placeholder="Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
        <button type="submit">Add Drug</button>
      </form>
    </div>
  );
};

export default AddDrug;
