import React from 'react'
import Signup from './Signup';
import {BrowserRouter, Routes,Route} from "react-dom"
import Login from './login';


const App = () => 
  {
  return (

    <BrowserRouter>
    <Routes>
        <Route path="/register" element= {<Signup/>}></Route>
        <Route path="/login" element= {<Login/>}></Route>
    </Routes>
    </BrowserRouter>

  )
}

export default App;
