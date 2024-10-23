// src/components/CategoryList.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = ({ onEdit, onDelete }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://grad-ecommerce.onrender.com/api/category");
      if (response.data.status) {
        setCategories(response.data.data);
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  return (
    <div>
      <h2>Category List</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <div>
              <h3>{category.categoryName}</h3>
              <img src={category.logo} alt={category.categoryName} />
              <button onClick={() => onEdit(category)}>Edit</button>
              <button onClick={() => onDelete(category.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
