import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import axios from 'axios';
import getCsrfToken from './cssrf';

const Phase = () => {
  const [images, setImages] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    // Fetch CSRF token when the component mounts
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      console.log(token);
      setCsrfToken(token);
    };
    fetchCsrfToken();
  }, []);


  useEffect(() => {
    const fetchImages = async () => {
      if (!csrfToken) return;

      try {
        const response = await axios.get('http://127.0.0.1:8000/app/get-images/', {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        });

        // Assuming response.data.images contains the array of image objects json
        setImages(response.data.images.reverse()); // Reverse to show latest first
        console.log(response.data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [csrfToken]);

  return (
    <div className='mt-10  border border-black text-center'>
      <h1 className='text-2xl font-semibold mb-10'>Images in different Phases</h1>
      <div className='flex justify-center'>
      <div className="grid grid-cols-3 gap-10 w-1/2">
      
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={`http://127.0.0.1:8000${image.url}`}
              alt={`Image ${index}`}
              className="shadow-md"
            />
            <div className="p-2  text-left">
              {image.name}
            </div>
          </div>
        ))}
      </div>
      <img src='Images/explain.png'/>
      </div>

      <footer className="bg-backgreen mt-10">
        <Footer
          image="Images/Artboard 2.svg"
          name="TOMEX"
          paragraph="Hey there, this section contains all the images you have predicted. We hope it helps. Thank you!"
          Email="Aaasd34@gmail.com"
          phone="+977 984755555"
          Address="Baglung-Municipality"
        />
      </footer>
    </div>
  );
};

export default Phase;
