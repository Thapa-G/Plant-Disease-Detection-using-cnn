import React from 'react'
import Header from './component/Header';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './component/Home';
import Mylist from './component/Mylist';
import Register from './component/Register';
import Login from './component/login';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"element={<Header/>}>
      <Route index element={<Home />}/>
      <Route path="Mylist" element={<Mylist/>}/>
      <Route path="Register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App