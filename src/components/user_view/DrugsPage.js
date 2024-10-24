import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/styles.css';

const DrugsPage = () => {
  const { categoryId } = useParams(); // Get the categoryId from the URL
  const { state } = useLocation(); // Get categoryName from the location state
  const [drugs, setDrugs] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Get the token from localStorage

  // Fetch drugs for the selected category
  useEffect(() => {
    axios.get(`https://grad-ecommerce-production.up.railway.app/api/drugs-view/category/${categoryId}`, {
      headers: {
        // Token is still commented out here as per your changes
        // Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setDrugs(response.data.data); // assuming the drugs are inside `data`
      })
      .catch(error => {
        console.error('Error fetching drugs:', error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access (e.g., redirect to login)
          console.log('Unauthorized, redirecting to login...');
          navigate('/login');
        }
      });
  }, [categoryId, navigate, token]);

  return (
    <div className="container"> {/* Optional: Add a container for overall layout */}
      <h2>Drugs for Category: {state?.categoryName || 'Loading...'}</h2>
      <ul className="drugs-list"> {/* Updated className here */}
        {drugs.map(drug => (
          <li key={drug.drugId}>
            <img src={drug.imageUrl} alt={drug.drugName} width={50} />
            <div>
              <h3>{drug.drugName}</h3>
              <p>{drug.description}</p>
              <p className="price">Price: ${drug.price}</p>
              <p className={`stock ${drug.available ? 'available' : 'unavailable'}`}>
                {drug.available ? 'Available' : 'Out of Stock'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugsPage;
