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
            const response = await axios.post('http://localhost:8080/api/login', formData);

            if (response.data.token) {
                // Save the token in localStorage or sessionStorage
                localStorage.setItem('token', response.data.token);

                setMessage('Login successful!');
                // Redirect to another page after login (e.g., dashboard or home page)
                navigate('/dashboard');
            } else {
                setMessage('Login failed: Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.message || 'Something went wrong';
            setMessage('Login failed: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        // Navigate to the Signup page
        navigate('/signup');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {message && <p>{message}</p>}
            </form>

            <p>Don't have an account? <button onClick={handleRegisterClick}>Register</button></p>
        </div>
    );
};

export default Login;
