import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            // Send login request
            const loginResponse = await axios.post('https://grad-ecommerce-production.up.railway.app/api/login', formData);

            if (loginResponse.status) {
                // Save the token in localStorage
                const token = loginResponse.data.data; // Ensure the token is a string
                localStorage.setItem('token', token);
                setMessage('Login successful!');
                console.log(token);

                // Prepare token for role request
                const tokenDTO = { token: token };

                // Send the token in the body as JSON to get the user role
                const roleResponse = await axios.post(
                    `https://grad-ecommerce-production.up.railway.app/api/user/role`,
                    tokenDTO // Send token in request body
                );

                const userRole = roleResponse.data.data;
                console.log(userRole);

                // Redirect based on the user's role
                if (userRole === 'ROLE_CLIENT') {
                    navigate('/');
                } else if (userRole === 'ROLE_ADMIN') {
                    navigate('/admin-dashboard');
                } else if (userRole === 'ROLE_COMPANY') {
                    navigate('/company-dashboard');
                } else {
                    setMessage('Unknown role. Please contact support.');
                }
            } else {
                setMessage('Login failed: Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage('Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        navigate('/signup');
    };

    return (
        <div className="h-screen bg-gradient-to-b from-blue-50 to-teal-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-teal-800 mb-8 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-500 transition-colors duration-300"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {message && <p className="mt-4 text-center text-red-500">{message}</p>}
                </form>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <button onClick={handleRegisterClick} className="text-teal-600 font-semibold hover:text-teal-500">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
