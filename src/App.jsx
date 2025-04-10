import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
      /<Route element={<Home/>} path='/chat' ></Route>
      /<Route element={<LandingPage/>} path='/' ></Route>
      </Routes>
      </Router>
    </div>
  )
}

export default App
