import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Landingpage from 'pages/customer/Landingpage';
import ChatGpt from 'pages/customer/ChatApp/ChatGpt';

function Main() {
  return (
    <>
      <main>
        <section className=' '>
          <Routes>
            <Route path='/landingPage' element={<Landingpage />} />
            <Route path='/' element={<ChatGpt />} />
            
          </Routes>
        </section>
      </main>
    </>
  );
}

export default Main;
