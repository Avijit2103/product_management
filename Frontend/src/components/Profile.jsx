import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    // State to store user data
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from localStorage
        const authString = localStorage.getItem('userdata');

        if (authString) {
            try {
                const parsedData = JSON.parse(authString);
                setUserData(parsedData); // Set user data to state
            } catch (e) {
                console.error("Error parsing user data from localStorage:", e);
                alert('Invalid user data. Please log in again.');
                localStorage.clear(); // Clear invalid data
                navigate('/login'); // Redirect to login
            }
        } else {
            // If no user data found, redirect to login
            alert('You are not logged in. Please log in to view your profile.');
            navigate('/login');
        }
    }, [navigate]); // Add navigate to dependency array

    return (
        <div className='profile-container'> {/* Main container for centering */}
            {userData ? (
                <div className='profile-card'> {/* Card-like container for profile details */}
                    <h1>User Profile</h1>
                    <div className="profile-detail">
                        <strong>Name:</strong> <span>{userData.name}</span>
                    </div>
                    <div className="profile-detail">
                        <strong>Email:</strong> <span>{userData.email}</span>
                    </div>
                    {/* You can add more user details here if available in userData */}
                </div>
            ) : (
                <p>Loading profile data or redirecting...</p> // Message while data is loading or if redirecting
            )}
        </div>
    );
};

export default Profile;
