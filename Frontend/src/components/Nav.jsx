import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem("userdata"); // Checks if user data exists in local storage
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Function to handle user logout
    const logout = () => {
        localStorage.clear(); // Clears all local storage data
        navigate("/Signup"); // Redirects to the signup page after logout
    };

    return (
        <div className='navbar'> {/* Main container for the navigation bar */}
             <span className='logo'>E-COMM</span>
            {auth ? ( // Conditional rendering based on authentication status
                <ul className='nav-ul'> {/* Navigation links for authenticated users */}
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/Signup">Logout</Link></li> {/* Logout link */}
                </ul>
            ) : (
                <ul className='nav-ul nav-right'> {/* Navigation links for unauthenticated users, aligned right */}
                    <li><Link to="/Signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </div>
    );
};

export default Nav;