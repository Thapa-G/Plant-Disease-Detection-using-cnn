// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import getCsrfToken from './cssrf'; 
// import Footer from './Footer';// Ensure this function correctly fetches the CSRF token

// const UserImages = () => {
//   const [images, setImages] = useState([]);
//   const [csrftoken, setCsrfToken] = useState('');

//   useEffect(() => {
//     // Fetch CSRF token when the component mounts
//     const fetchCsrfToken = async () => {
//       try {
//         const token = await getCsrfToken();
//         setCsrfToken(token);
//       } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//       }
//     };
//     fetchCsrfToken();
//   }, []);

//   useEffect(() => {
//     const fetchImages = async () => {
//       if (!csrftoken) return; // Ensure CSRF token is fetched before making the request

//       try {
//         const response = await axios.get('http://localhost:8000/app/user-images/', {
//           headers: {
//             'X-CSRFToken': csrftoken, // Include the CSRF token in the headers
//           },
//           withCredentials: true, // Ensures cookies are sent for authentication
//         });
//         setImages(response.data);
//       } catch (error) {
//         console.error('Error fetching images:', error);
//       }
//     };

//     fetchImages();
//   }, [csrftoken]); // Re-run when the CSRF token changes

//   return (
  
//   <div className='h-screen'>
//   <h1 className='text-center font-nunito text-2xl mt-5'>Images and Prediction</h1>
//   {images.length > 0 ? (
//     <div className='flex justify-center'>
//       <table className=' border-separate border-spacing-10'>
//         <thead>
//           <tr>
//             {images
//               .slice(-10) // Get the last 5 images
//               .reverse() // Reverse to show the most recent first
//               .map((image) => (
//                 <th key={`header-${image.id}`}>
//                   <img 
//                     src={`http://localhost:8000${image.image}`} 
//                     alt="Uploaded" 
//                     className='w-52 h-52 border rounded-lg'
//                   />
//                 </th>
//               ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             {images
//               .slice(-5)
//               .reverse()
//               .map((image) => (
//                 <td key={image.id} className='text-center font-nunito text-xl'>
//                   {image.predicted_label || 'Not yet predicted'}
//                 </td>
//               ))}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   ) : (
//     <p>No images uploaded yet.</p>
//   )}
//   <div className='bg-backgreen relative bottom-0'>
//       <Footer image='Images/Artboard 2.svg' name='TOMEX' paragraph='Hey there this section contains the last 5 images you have predicted , we hope it helps .Thank you!' Email='Aaasd34@gmail.com' phone='+977 984755555' Address='Baglung-Municipality'/>
//     </div>
// </div>
//   );
// };

// export default UserImages;


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
        const response = await axios.get('http://localhost:8000/app/user-images/', {
          headers: {
            'X-CSRFToken': csrftoken,
          },
          withCredentials: true,
        });
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [csrftoken]);

  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow'>
        <h1 className='text-center font-nunito text-2xl mt-5'>Images and Prediction</h1>
        {images.length > 0 ? (
          <div className='flex justify-center'>
            <table className='border-separate border-spacing-10'>
              <thead>
                <tr>
                  {images
                    .slice(-5)
                    .reverse()
                    .map((image) => (
                      <th key={`header-${image.id}`}>
                        <img 
                          src={`http://localhost:8000${image.image}`} 
                          alt="Uploaded" 
                          className='w-52 h-52 border rounded-lg'
                        />
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {images
                    .slice(-5)
                    .reverse()
                    .map((image) => (
                      <td key={image.id} className='text-center font-nunito text-xl'>
                        {image.predicted_label || 'Not yet predicted'}
                      </td>
                    ))}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-center'>No images uploaded yet.</p>
        )}
      </main>
      <footer className='bg-backgreen'>
        <Footer 
          image='Images/Artboard 2.svg' 
          name='TOMEX' 
          paragraph='Hey there, this section contains the last 5 images you have predicted. We hope it helps. Thank you!' 
          Email='Aaasd34@gmail.com' 
          phone='+977 984755555' 
          Address='Baglung-Municipality' 
        />
      </footer>
    </div>
  );
};

export default UserImages;
