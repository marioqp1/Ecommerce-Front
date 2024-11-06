import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    return headers;
  };

  const handleAddToCart = () => {
    if (selectedBranch) {
      const item = {
        drugId: drug.drugId,
        branchId: selectedBranch,
        quantity,
      };
      axios.post('https://grad-ecommerce-production.up.railway.app/api/items/save', item, getAuthHeaders())
        .then(() => setMessage('Drug added to cart!'))
        .catch(error => setMessage('Failed to add drug to cart.'));
    } else {
      setMessage('Please select a branch.');
    }
  };

  const handleFavorite = () => {
    setMessage('Drug added to favorites!');
  };

  if (!drug) return <div>Loading...</div>;

  return (
    <div className="h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center mb-8 lg:mb-0 lg:w-1/2">
            <img src={drug.imageUrl} alt={drug.drugName} className="w-48 h-48 object-contain rounded-lg" />
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <h3 className="text-3xl font-semibold text-teal-800 mb-4">{drug.drugName}</h3>
            <p className="text-gray-600 mb-6">{drug.description}</p>
            <p className="text-xl font-bold text-teal-600 mb-4">Price: ${drug.price}</p>
            <p className={`text-lg font-semibold ${drug.available ? 'text-green-600' : 'text-red-600'}`}>
              {drug.available ? 'Available' : 'Out of Stock'}
            </p>

            <div className="mt-6 mb-4">
              <label htmlFor="branches" className="block text-lg text-teal-600 mb-2">Select Branch:</label>
              <select
                id="branches"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                onChange={handleBranchChange}
              >
                <option value="">Choose a branch</option>
                {branches.map(branch => (
                  <option key={branch.branchId} value={branch.branchId}>
                    {branch.branchName} - ${branch.price}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6 mb-4">
              <label htmlFor="quantity" className="block text-lg text-teal-600 mb-2">Quantity:</label>
              <input
                type="number"
                id="quantity"
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </div>

            <div className="mt-6 flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!selectedBranch}
                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md shadow-md hover:bg-teal-700 transition-colors duration-300"
              >
                Add to Cart
              </button>
              <button
                onClick={handleFavorite}
                className="px-6 py-3 bg-teal-600 text-white font-medium rounded-md shadow-md hover:bg-teal-700 transition-colors duration-300"
              >
                Add to Favorites
              </button>
            </div>

            {message && <p className="mt-4 text-center text-lg font-semibold text-teal-600">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrugDetails;
