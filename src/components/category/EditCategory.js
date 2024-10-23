// src/components/EditCategory.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCategory = ({ category, onCategoryUpdated }) => {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [logo, setLogo] = useState(category.logo);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://grad-ecommerce.onrender.com/api/category/${category.id}`,
        {
          categoryName,
          logo,
        }
      );
      if (response.data.status) {
        onCategoryUpdated();
      } else {
        console.error("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Category</h2>
      <div>
        <label>Category Name:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <div>
        <label>Logo URL:</label>
        <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />
      </div>
      <button type="submit">Update Category</button>
    </form>
  );
};

export default EditCategory;
