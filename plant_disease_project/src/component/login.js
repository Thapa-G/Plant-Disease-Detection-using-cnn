import React, { useState,useEffect } from 'react';
import { Link , useNavigate } from 'react-router-dom';

import axios from 'axios';


const Login = () => {
  const [credentials, setCredentials] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post('http://localhost:8000/app/login/', credentials,
        {
          withCredentials: true  // This tells the browser to accept and store cookies from the backend
        }
      );
      console.log('Response', response.data);
      setMessage('Login successful');

      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log('Error Login', error);
      setMessage('Login fail');
    }
    
  };
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);

      // Cleanup the timer if the component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className='min-h-screen bg-green-900 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>Username</label>
            <input 
              type='text' 
              id='username' 
              name='username' 
              className='border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-green-500' 
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} 
              required 
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>Password</label>
            <input 
              type='password' 
              id='password' 
              name='password' 
              className='border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-green-500' 
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
              required 
            />
          </div>

          <button 
            onClick={handleSubmit} 
            id='submitt'
            className='bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-green-700 transition duration-300'>
            Login
          </button>
        

        {message && <p className='mt-4 text-center text-green-500'>{message}</p>}

        {/* Don't have an account? */}
        <p className='mt-4 text-center text-gray-700'>
          Don't have an account?{' '}
          <Link to='/Register' className='text-green-600 hover:underline'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
