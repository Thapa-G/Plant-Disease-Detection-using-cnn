import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import LogoutButton from './logout';
import axios from 'axios';
import getCsrfToken from './cssrf';
const Header = () => {
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    let token=""
    useEffect(() => {
      const fetchCsrfToken = async () => {
        token = await getCsrfToken();
        console.log(token)
      };
     
      const fetchSessionId = async () => {
          try {
              const response = await axios.get('http://localhost:8000/app/session-id/', {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  "X-CSRFToken": token,  // Include CSRF token in the headers
              },
                  withCredentials: true,  // Important for sending cookies
              });
              setSessionId(response.data.sessionid);
          } catch (err) {
              console.log(err.message)
          }
      };
      fetchCsrfToken()
      fetchSessionId();
  }, []);
    return (
    <>
    <nav className='flex bg-transparent justify-between mx-14 px-6 py-1 border-b border-stone-200 border-opacity-7 font-nunito text-black text-lg font-semibold antialiased tracking-wide items-center '>
       <div className='py-2 flex items-center gap-1'>
            <img src='Images/Artboard 1.svg' alt="logo"  className='w-9 h-auto'/> <h1 className='max-sm:hidden' >Tomex</h1>
        </div>

    
    <ul className={`flex gap-8   py-2 transition-transform duration-200 ease-in-out transform  ${isMenuOpen ? 'translate-x-5 opacity-100 ' : 'translate-x-2/3 opacity-0 '}  sm:translate-x-0 sm:opacity-100 `}>
      <li>
        <Link to="phase">Phase</Link>
      </li>
      <li>
        <Link to="Train">Train</Link>
      </li>
      <li>
      <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="Mylist">History</Link>
      </li>
      <li>
        <Link to="Classification_report">Report</Link> 
      </li>
      <li>
        <Link to="pre_processing">Pre-Processing</Link>
      </li>
    </ul>
    
    
    <div className='flex flex-row'>
      {sessionId?(
        <button className={`${isMenuOpen? 'hidden' : 'block'}`}><LogoutButton/></button>
        
      ):(
        <Link to="login" id='Loginbutton' className='py-2  rounded'><button className={`${isMenuOpen? 'hidden' : 'block'}`}>Login</button></Link>
      )}
      
      <Link to="Register" className={`${sessionId?'hidden':'block'}`}><button className={`${isMenuOpen? 'hidden' : 'block'} sm:flex px-4 py-2  rounded `}>Register</button></Link>
    </div>
    <button className="transition ease-out duration-500 active:-rotate-90 ml-5 sm:hidden " onClick={()=>setIsMenuOpen(!isMenuOpen)}>
    {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
    </button>
  </nav>
  <Outlet/>
</>
  )
}

export default Header