import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/styles.css'; // Add this import for the CSS file

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
                const token = loginResponse.data;  // Ensure the token is a string
                localStorage.setItem('token', token);

                setMessage('Login successful!');

                // Prepare token for role request
                const tokenDTO = { token:token.data };
            
                console.log(tokenDTO.data);

                // Send the token in the body as JSON to get the user role
                const roleResponse = await axios.post(
                    `http://localhost:8080/api/user/role`,
                    tokenDTO // Send token in request body
                );

                const userRole = roleResponse.data.data;
                console.log(userRole);

                // Redirect based on the user's role
                if (userRole === 'ROLE_CLIENT') {
                    //ROLE_CLIENT
                
                    navigate('/');
                } else if (userRole === 'ROLE_ADMIN') {
                    //navigate('/admin');
                } else if (userRole === 'ROLE_COMPANY') {
                    //navigate('/company');
                } else {
                    setMessage('Unknown role. Please contact support.');
                }
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
        <div className="login-page">
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
