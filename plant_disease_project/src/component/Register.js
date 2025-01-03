import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post('http://localhost:8000/app/register/', user);
      console.log('Response', response.data);
      setMessage('User registered successfully!');
    } catch (error) {
      console.log('Error Register', error);
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-green-900 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 font-semibold mb-2'>Username</label>
            <input 
              type='text' 
              id='username' 
              name='username' 
              className='border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-green-500' 
              onChange={(e) => setUser({ ...user, username: e.target.value })} 
              required 
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>Email</label>
            <input 
              type='email' 
              id='email' 
              name='email' 
              className='border border-gray-300 p-2 w-full rounded-lg focus:outline-none focus:border-green-500' 
              onChange={(e) => setUser({ ...user, email: e.target.value })} 
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
              onChange={(e) => setUser({ ...user, password: e.target.value })} 
              required 
            />
          </div>

          <button 
            type='submit' 
            className='bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-green-700 transition duration-300'>
            Submit
          </button>
        </form>
        
        {message && <p className='mt-4 text-center text-green-500'>{message}</p>}
        
        {/* Already have an account? */}
        <p className='mt-4 text-center text-gray-700'>
          Already have an account?{' '}
          <Link to='/login' className='text-green-600 hover:underline'>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
