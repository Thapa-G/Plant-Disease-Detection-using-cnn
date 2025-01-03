import axios from 'axios';
import React, { useState,useEffect } from 'react';
import  getCsrfToken   from './cssrf';  // Assuming you already have CSRF token utility

const LogoutButton = () => {
    const [csrfToken, setCsrfToken] = useState('');
    useEffect(() => {
    // Fetch CSRF token when the component mounts
      const fetchCsrfToken = async () => {
        const token = await getCsrfToken();
        setCsrfToken(token);
      };
     fetchCsrfToken();
     }, []);

    const handleLogout = async () => {
        

        try {
            await axios.post(
                'http://localhost:8000/app/logout/',  // Django logout URL
                {},
                {
                    headers: {
                        'X-CSRFToken': csrfToken,
                    },
                    withCredentials: true,  // This ensures session credentials (like cookies) are sent
                }
            );
            console.log('CSRF Token:', csrfToken);
            window.location.reload();
            
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
