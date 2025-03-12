import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCsrfToken from './cssrf'; 
import Footer from './Footer';

const UserImages = () => {
  const [images, setImages] = useState([]);
  const [csrftoken, setCsrfToken] = useState('');

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
    const fetchImages = async () => {
      if (!csrftoken) return;

      try {
        const response = await axios.get('http://localhost:8000/app/mylist/', {
          headers: {
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        });
        // images <- setImages
        setImages(response.data.reverse()); // Reverse to show latest first
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [csrftoken]);

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>
        <h1 className='text-center font-nunito text-2xl mt-5'>Images and Predictions</h1>
        
        {/* condition ? truee : false */}
        {images.length > 0 ? (
          <div className="flex justify-center mt-5">
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">  
              {images.map((image) => (
                <div key={image.id} className="border p-4 rounded-lg shadow-lg text-center bg-white">
                  {/* Image */}
                  <img 
                    src={`http://localhost:8000${image.image}`} 
                    alt="Uploaded" 
                    className='w-48 h-48 border rounded-lg object-cover mx-auto'
                  />
                  {/* Prediction & Confidence */}
                  <p className="mt-2 font-semibold text-lg text-gray-800">{image.predicted_label || 'Not yet predicted'}</p>
                  <p className="text-gray-600">
                    Confidence: {image.confidence ? `${(image.confidence * 100).toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className='text-center text-gray-600 mt-5'>No images uploaded yet.</p>
        )}
      </main>

      <footer className='bg-backgreen mt-10'>
        <Footer 
          image='Images/Artboard 2.svg' 
          name='TOMEX' 
          paragraph='Hey there, this section contains all the images you have predicted. We hope it helps. Thank you!' 
          Email='Aaasd34@gmail.com' 
          phone='+977 984755555' 
          Address='Baglung-Municipality' 
        />
      </footer>
    </div>
  );
};

export default UserImages;
