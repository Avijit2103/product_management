import React, { useEffect, useState } from 'react'; // Destructure useState and useEffect
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    // State variables for name, email, and password, initialized to empty strings
    const [name, setName] = useState('');
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

    // Function to handle the signup submission
    const handleSignup = async () => { // Renamed from showInfo for clarity
        // Basic client-side validation: ensure all fields are filled
        if (!name || !email || !password) {
            alert('Please fill in all fields.'); // Using alert as per original, consider a custom modal for better UX
            return; // Stop execution if validation fails
        }

        try {
            // Make a POST request to the registration API endpoint
            const result = await fetch('/api/reg', {
                method: 'POST',
                body: JSON.stringify({ name, email, password }), // Send user data as JSON
                headers: {
                    'Content-Type': 'application/json', // Specify content type
                },
            });

            // Check if the HTTP response status is not OK (e.g., 400, 409, 500)
            if (!result.ok) {
                const errorData = await result.json(); // Parse error response from backend
                // Display error message from backend or a generic one
                alert(errorData.message || 'Registration failed. Please try again.');
                return; // Stop execution
            }

            // If response is OK, parse the successful JSON result
            const res = await result.json();
            console.log(res); // Log the response for debugging

            // Assuming a successful registration returns user data
            if (res) {
                localStorage.setItem('userdata', JSON.stringify(res)); // Store user data in local storage
                navigate('/'); // Redirect to home page on successful registration
            } else {
                // Fallback for cases where backend returns 200 but no user data
                alert('Registration was successful, but no user data received.');
            }
        } catch (error) {
            // Catch network errors or issues during fetch operation
            console.error('Error during signup:', error);
            alert('An error occurred during registration. Please try again later.');
        }
    };

    return (
        <div className='form'> {/* Main container for the signup form */}
            <h1>Register</h1> {/* Heading for the signup form */}
            <input
                type="text"
                className='inputBox' // Class for styling input fields
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state on change
                placeholder='Enter Name'
                aria-label='Enter your name' // Accessibility label
            />
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
                onClick={handleSignup} // Call handleSignup function on click
                className='submit' // Class for styling the submit button
            >
                Sign up
            </button>
        </div>
    );
};

export default Signup;
