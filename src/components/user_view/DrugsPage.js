import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/DrugsPage.css';

const DrugsPage = () => {
    const { categoryId } = useParams();
    const { state } = useLocation();
    const [drugs, setDrugs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
      
        axios.get(`http://localhost:8080/api/drugs-view/category/${categoryId}`, {
            headers: {
                // Token is still commented out here as per your changes
                // Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setDrugs(response.data.data);
                console.log(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching drugs:', error);
                if (error.response && error.response.status === 401) {
                    console.log('Unauthorized, redirecting to login...');
                    navigate('/login');
                }
            });
    }, [categoryId, navigate, token]);

    const handleDrugClick = (drugId) => {
        navigate(`/drug/details/${drugId}`);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Drugs for Category: {state?.categoryName || 'Loading...'}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {drugs.map(drug => (
                    <li key={drug.drugId} className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer" onClick={() => handleDrugClick(drug.drugId)}>
                        <img src={drug.imageUrl} alt={drug.drugName} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{drug.drugName}</h3>
                            <p className="mb-2">{drug.description}</p>
                            <p className="text-lg font-bold text-green-500 mb-2">Price: ${drug.price}</p>
                            <p className={`text-sm font-medium ${drug.available ? 'text-green-600' : 'text-red-600'}`}>
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
