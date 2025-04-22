import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './assets/AuthContext';

const App = () => {
  return (
    <AuthProvider>
          <div>
      <Router>
        <Routes>
      /<Route element={<Home/>} path='/chat' ></Route>
      /<Route element={<LandingPage/>} path='/' ></Route>
      /<Route element={<MarketPlace/>} path='/marketplace' ></Route>
      </Routes>
      </Router>
    </div>
    </AuthProvider>
  )
}

export default App
