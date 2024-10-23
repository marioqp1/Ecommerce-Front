import React, { useState } from 'react';
import { searchDrugsByName } from '../../services/DrugService';

const SearchDrug = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await searchDrugsByName(searchTerm);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching drugs:', error);
      alert('Failed to search drugs');
    }
  };

  return (
    <div>
      <h2>Search Drugs</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by drug name"
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {searchResults.map((drug) => (
          <li key={drug.id}>{drug.drugName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDrug;
