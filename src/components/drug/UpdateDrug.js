import React, { useState } from 'react';
import { updateDrug } from '../../services/DrugService';

const UpdateDrug = ({ drug, token }) => {
  const [updatedDrug, setUpdatedDrug] = useState(drug);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDrug({ ...updatedDrug, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDrug(updatedDrug.id, updatedDrug, token);
      alert('Drug updated successfully');
    } catch (error) {
      console.error('Error updating drug:', error);
      alert('Failed to update drug');
    }
  };

  return (
    <div>
      <h2>Update Drug</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="drugName"
          placeholder="Drug Name"
          value={updatedDrug.drugName}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={updatedDrug.description}
          onChange={handleChange}
        />
        <button type="submit">Update Drug</button>
      </form>
    </div>
  );
};

export default UpdateDrug;
