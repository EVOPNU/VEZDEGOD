import './App.css';
import React from "react";
import LogUp from "./pages/logUp";
import LogIn from "./pages/logIn";
import {BrowserRouter, Route,Routes} from "react-router-dom";
import Profile from "./pages/profile";

function App() {
  return(
    // <div>
    //   <LogUp/>
    //   <LogIn/>
    // </div>
      <BrowserRouter>
        <Routes>
          <Route path='/logUp' element={<LogUp/>}/>
          <Route path='/' element={<LogUp/>}/>
          <Route path='/logIn' element={<LogIn/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
);
}

export default App;
