import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

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

        // Construct the data object to match your DTO
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
        <div className="signup-page">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="radio-buttons">
                    <label>
                        <input
                            type="radio"
                            value="client"
                            checked={!isCompany}
                            onChange={handleRadioChange}
                        />
                        Client
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="company"
                            checked={isCompany}
                            onChange={handleRadioChange}
                        />
                        Company
                    </label>
                </div>

                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
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
                    />
                </div>

                <div className="input-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label>Gender:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
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
                            />
                        </div>
                    </>
                )}

                <button type="submit" disabled={loading}>
                    {loading ? 'Signing Up...' : 'Signup'}
                </button>

                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default Signup;
