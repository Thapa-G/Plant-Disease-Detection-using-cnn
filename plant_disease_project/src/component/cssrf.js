import axios from 'axios';

// Function to fetch CSRF token from Django
const getCsrfToken = async () => {
    try {
        const response = await axios.get('http://localhost:8000/app/cssrf/', {
            withCredentials: true, // This ensures that cookies (including CSRF token) are sent in the request
        });
        console.log(response.data.csrfToken)
        return response.data.csrfToken;

    } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return null;
    }
};
export default getCsrfToken;
// Get CSRF token from cookie
// const getCsrfToken = () => {
//     const csrfToken = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('csrftoken'))
//       ?.split('=')[1];

//     return csrfToken;
//   }
 