// src/components/AddCategory.js
import React, { useState } from "react";
import axios from "axios";

const AddCategory = ({ onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");
  const [logo, setLogo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://grad-ecommerce.onrender.com/api/category", {
        categoryName,
        logo,
      });
      if (response.data.status) {
        onCategoryAdded();
      } else {
        console.error("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Category</h2>
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
        <input
          type="text"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
        />
      </div>
      <button type="submit">Add Category</button>
    </form>
  );
};

export default AddCategory;
