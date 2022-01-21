import React from 'react';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';
import LandingPage from 'pages/Landingpage';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';

function Main() {
  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </>
  );
}

export default Main;
