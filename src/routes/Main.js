import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from 'pages/Signin';
import Signup from 'pages/Signup';
import ForgotPassword from 'pages/ForgotPassword';
import UpdatePassword from 'pages/UpdatePassword';
import Landingpage from 'pages/Landingpage';

function Main() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landingpage />} />

        <Route path='/signup' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/updatepass/:email/:id' element={<UpdatePassword />} />
      </Routes>
    </>
  );
}

export default Main;
