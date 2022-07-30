import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Landingpage from 'pages/customer/Landingpage';

function Main() {
  return (
    <>
      <main>
        <section className='relative w-full py-32 h-full  min-h-screen '>
          <Routes>
            <Route path='/' element={<Landingpage />} />
          </Routes>
        </section>
      </main>
    </>
  );
}

export default Main;
