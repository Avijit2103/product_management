import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authString = localStorage.getItem('userdata');

        if (authString) {
            try {
                const parsedData = JSON.parse(authString);
                setUserData(parsedData);
            } catch (e) {
                console.error("Error parsing user data from localStorage:", e);
                alert('Invalid user data. Please log in again.');
                localStorage.clear();
                navigate('/login');
            }
        } else {
            alert('You are not logged in. Please log in to view your profile.');
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className='profile-container'>
            {userData ? (
                <div className='profile-card'>
                    <h1>User Profile</h1>
                    <div className="profile-detail">
                        <strong>Name:</strong> <span>{userData.data.name}</span>
                    </div>
                    <div className="profile-detail">
                        <strong>Email:</strong> <span>{userData.data.email}</span>
                    </div>
                    {userData.data._id && (
                        <div className="profile-detail">
                            <strong>User ID:</strong> <span>{userData.data._id}</span>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading profile data or redirecting...</p>
            )}
        </div>
    );
};

export default Profile;