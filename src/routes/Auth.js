import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from 'pages/auth/Signin';
import Signup from 'pages/auth/Signup';
import ForgotPassword from 'pages/auth/ForgotPassword';
import UpdatePassword from 'pages/auth/UpdatePassword';

function Auth() {
  return (
    <>
      <main>
        <section className='relative w-full py-32 h-full  min-h-screen '>
          <Routes>
            <Route path='signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} />
            <Route path='/updatepass/:email/:id' element={<UpdatePassword />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default Auth;
