/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        poppins:['Poppins','sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        montserrat: ['Montserrat Alternates', 'sans-serif'],
      },
      backgroundImage:{
        'back':"url('/public/Images/Artboard 1back.png')",
      },
      backgroundColor: {
        'backgreen': '#74a860',
        'backDarkgreen': '#6ba156'
      },
      dropShadow: {
        '3al': '0 0 65px rgba(0, 0, 0, 1)',
    },
    boxShadow: {
      'custom-light': '0 4px 6px rgba(0, 0, 0, 0.2)',
      
    },
    },
  },
  plugins: [],
}

