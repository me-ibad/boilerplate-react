import React from 'react';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';
import LandingPage from 'pages/Landingpage';
function Main() {
  return (
    <>
      <Routes>
        <Route path='/landing' element={<LandingPage />} />

        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default Main;
