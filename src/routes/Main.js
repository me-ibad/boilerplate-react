import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Landingpage from 'pages/customer/Landingpage';
import ChatGpt from 'pages/customer/ChatApp/ChatGpt';
import HomeScreen from 'pages/customer/ChatApp/HomeScreen';

function Main() {
  return (
    <>
      <main>
        <section className=' '>
          <Routes>
            <Route path='/landingPage' element={<Landingpage />} />
            <Route path='/ChatGpt' element={<ChatGpt />} />
            <Route path='/' element={<HomeScreen />} />
            
          </Routes>
        </section>
      </main>
    </>
  );
}

export default Main;
