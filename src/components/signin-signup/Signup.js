import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [isCompany, setIsCompany] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        gender: '',
        companyName: '',
        companyEmail: '',
        companyPhone: ''
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRadioChange = (e) => {
        setIsCompany(e.target.value === 'company');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { email, password, firstName, lastName, phone, address, city, gender, companyName, companyEmail, companyPhone } = formData;
        const apiEndpoint = isCompany ? '/api/signup/company' : '/api/signup/client';

        const data = isCompany 
            ? { email, password, firstName, lastName, phone, address, city, gender, companyName, companyEmail, companyPhone } 
            : { email, password, firstName, lastName, phone, address, city, gender };

        try {
            const response = await axios.post(`https://grad-ecommerce-production.up.railway.app${apiEndpoint}`, data);
            
            if (response.data.status) {
                setMessage('Signup successful! Redirecting...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response) {
                setMessage('Signup failed: ' + (error.response.data?.message || 'Something went wrong'));
            } else if (error.request) {
                setMessage('Signup failed: No response from server');
            } else {
                setMessage('Signup failed: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Signup</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between">
                        <label className="mr-2">Client</label>
                        <input
                            type="radio"
                            value="client"
                            checked={!isCompany}
                            onChange={handleRadioChange}
                        />
                        <label className="ml-4 mr-2">Company</label>
                        <input
                            type="radio"
                            value="company"
                            checked={isCompany}
                            onChange={handleRadioChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>Phone:</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div className="input-group">
                        <label>Gender:</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </select>
                    </div>

                    {isCompany && (
                        <>
                            <div className="input-group">
                                <label>Company Name:</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div className="input-group">
                                <label>Company Email:</label>
                                <input
                                    type="email"
                                    name="companyEmail"
                                    value={formData.companyEmail}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>

                            <div className="input-group">
                                <label>Company Phone:</label>
                                <input
                                    type="tel"
                                    name="companyPhone"
                                    value={formData.companyPhone}
                                    onChange={handleChange}
                                    required
                                    className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors duration-300"
                    >
                        {loading ? 'Signing Up...' : 'Signup'}
                    </button>

                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Signup;
