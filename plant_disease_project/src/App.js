import React from 'react'
import Header from './component/Header';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './component/Home';
import Mylist from './component/Mylist';
import Register from './component/Register';
import Login from './component/login';
import Report from './component/Classification_report';
import Pre_processing from './component/pre_processing';

import Train from './component/Train';
import Phase from './component/phase';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"element={<Header/>}>
      <Route index element={<Home />}/>
      <Route path="Mylist" element={<Mylist/>}/>
      <Route path="Register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="Classification_report" element={<Report/>}/>
      <Route path="Pre_processing" element={<Pre_processing/>}/>
      <Route path="phase" element={<Phase/>}/>
      <Route path="Train" element={<Train/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App