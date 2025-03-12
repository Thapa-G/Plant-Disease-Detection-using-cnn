import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCsrfToken from './cssrf'; 
import Footer from './Footer';

const Report = () => {
    const [pickleData, setPickleData] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchCsrfToken = async () => {
        try {
          const token = await getCsrfToken();
          setCsrfToken(token);
        } catch (error) {
          console.error('Error fetching CSRF token:', error);
        }
      };
      fetchCsrfToken();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
          if (!csrfToken) return;
          setLoading(true);
    
          try {
            const response = await axios.get('http://localhost:8000/app/get_matr/', {
              headers: { 'X-CSRFToken': csrfToken },
              withCredentials: true,
            });
    
            if (response.data) {
              setPickleData(response.data.pickle1);
              
            } else {
              setError('No data received');
            }
    
            setLoading(false);
          } catch (error) {
            console.error('Error fetching pickle data:', error);
            setError('Failed to fetch data');
            setLoading(false);
          }
        };
    
        fetchData();
      }, [csrfToken]);

      const renderPickleData = (data) => {
        if (!data) return <p>No data available</p>;
    
        return (
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <strong>{key}: </strong>
                <span>{JSON.stringify(value)}</span>
              </li>
            ))}
          </ul>
        );
      };
    return(
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Pickle File Data</h1>
      
            {error ? (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            ) : loading ? (
              <p style={{ textAlign: 'center' }}>Loading...</p>
            ) : (
              <div>
                <h2 style={{ color: '#4CAF50' }}>Pickle Data </h2>
                <div style={{ marginBottom: '20px' }}>{renderPickleData(pickleData)}</div>
              </div>
            )}
          </div>
        );
}
export default Report