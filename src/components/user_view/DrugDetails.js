import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/DrugDetails.css';

const DrugDetails = () => {
  const { drugId } = useParams();
  const [drug, setDrug] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`https://grad-ecommerce-production.up.railway.app/api/drugs-view/${drugId}/details`)
      .then(response => setDrug(response.data.data))
      .catch(error => console.error('Error fetching drug details:', error));

    axios.get(`https://grad-ecommerce-production.up.railway.app/api/drugs-view/${drugId}/branches`)
      .then(response => setBranches(response.data.data))
      .catch(error => console.error('Error fetching branches:', error));
  }, [drugId]);

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token'); // Ensure token is fetched from local storage
    const headers = { headers: { token } }; // Use the key 'token' as the header name
    console.log('Headers:', headers); // Log headers to verify the token
    return headers;
  };
  const handleAddToCart = () => {
    if (selectedBranch) {
      const item = {
        drugId: drug.drugId,
        branchId: selectedBranch,
        quantity,
        // Assuming price is handled on the backend
      };
      console.log(token);
      axios.post('https://grad-ecommerce-production.up.railway.app/api/items/save', item, getAuthHeaders())
        .then(() => setMessage('Drug added to cart!'))
        .catch(error => setMessage('Failed to add drug to cart.'));
    } else {
      setMessage('Please select a branch.');
    }
  };

  const handleFavorite = () => {
    // Add to favorites logic here
    setMessage('Drug added to favorites!');
  };

  if (!drug) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="drug-details">
        <img src={drug.imageUrl} alt={drug.drugName} />
        <h3>{drug.drugName}</h3>
        <p>{drug.description}</p>
        <p className="price">Price: ${drug.price}</p>
        <p className={`stock ${drug.available ? 'available' : 'unavailable'}`}>
          {drug.available ? 'Available' : 'Out of Stock'}
        </p>

        <div className="branches">
          <label htmlFor="branches">Select Branch:</label>
          <select id="branches" onChange={handleBranchChange}>
            <option value="">Choose a branch</option>
            {branches.map(branch => (
              <option key={branch.branchId} value={branch.branchId}>
                {branch.branchName} - ${branch.price}
              </option>
            ))}
          </select>
        </div>

        <div className="quantity">
          <label htmlFor="quantity">Quantity:</label>
          <input 
            type="number" 
            id="quantity" 
            value={quantity} 
            onChange={handleQuantityChange} 
            min="1"
          />
        </div>

        <div className="buttons">
          <button onClick={handleAddToCart} disabled={!selectedBranch}>Add to Cart</button>
          <button className="favorite" onClick={handleFavorite}>Add to Favorites</button>
        </div>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default DrugDetails;
