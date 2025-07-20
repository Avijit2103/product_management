import React, { useState, useEffect } from 'react'; // Destructure useState and useEffect
import { useNavigate } from 'react-router-dom';

const Login = () => {
    // State variables for email and password, initialized to empty strings
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Effect hook to redirect if user data is already in localStorage
    // This runs once on component mount to check for existing sessions
    useEffect(() => {
        if (localStorage.getItem('userdata')) {
            navigate('/'); // Redirect to home if user is already logged in
        }
    }, [navigate]); // 'navigate' is added to dependencies as it comes from a hook

    // Function to handle the login submission
    const handleLogin = async () => {
        // Basic client-side validation: ensure both fields are filled
        if (!email || !password) {
            alert('Please enter both email and password.'); // Using alert as per original, consider a custom modal for better UX
            return; // Stop execution if validation fails
        }

        try {
            // Make a POST request to the login API endpoint
            let result = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }), // Send email and password as JSON
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                },
            });

            // Check if the HTTP response status is not OK (e.g., 401, 500)
            if (!result.ok) {
                const errorData = await result.json(); // Parse error response from backend
                // Display error message from backend or a generic one
                alert(errorData.message || 'Login failed. Please check your credentials.');
                return; // Stop execution
            }

            // If response is OK, parse the successful JSON result
            result = await result.json();

            // Check if login was logically successful (e.g., backend returns 'name' for success)
            if (result.name) {
                localStorage.setItem('userdata', JSON.stringify(result)); // Store user data in local storage
                navigate('/'); // Redirect to home page on successful login
            } else {
                // Fallback for cases where backend returns 200 but no 'name' on logical failure
                alert('Invalid Email or Password.');
            }
        } catch (error) {
            // Catch network errors or issues during fetch operation
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };

    return (
        <div className='login'> {/* Main container for the login form */}
            <h2>Login</h2> {/* Heading for the login form */}
            <input
                type="text"
                className='inputBox' // Class for styling input fields
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                placeholder='Enter Email'
                aria-label='Enter your email' // Accessibility label
            />
            <input
                type="password"
                className='inputBox' // Class for styling input fields
                value={password}
                onChange={(e) => { setPassword(e.target.value) }} // Update password state on change
                placeholder='Enter password'
                aria-label='Enter your password' // Accessibility label
            />
            <button
                type='submit'
                onClick={handleLogin} // Call handleLogin function on click
                className='submit' // Class for styling the submit button
            >
                Login
            </button>
        </div>
    );
};

export default Login;
