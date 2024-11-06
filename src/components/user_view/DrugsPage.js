import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DrugsPage = () => {
    const { categoryId } = useParams();
    const { state } = useLocation();
    const [drugs, setDrugs] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`https://grad-ecommerce-production.up.railway.app/api/drugs-view/category/${categoryId}`, {
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
        <div className="h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl">
                <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">
                    Drugs for Category: {state?.categoryName || 'Loading...'}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {drugs.map(drug => (
                        <li
                            key={drug.drugId}
                            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:shadow-xl"
                            onClick={() => handleDrugClick(drug.drugId)}
                        >
                            <img src={drug.imageUrl} alt={drug.drugName} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-teal-800 mb-2">{drug.drugName}</h3>
                                <p className="text-gray-600 mb-2">{drug.description}</p>
                                <p className="text-lg font-bold text-teal-600 mb-2">Price: ${drug.price}</p>
                                <p className={`text-sm font-medium ${drug.available ? 'text-green-600' : 'text-red-600'}`}>
                                    {drug.available ? 'Available' : 'Out of Stock'}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DrugsPage;
