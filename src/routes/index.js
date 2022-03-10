import React from 'react';
import history from '../history';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';

function Root() {
  return (
    <Router history={history}>
      <main>
        <section className='relative w-full py-32 h-full  min-h-screen '>
          <Routes>
            <Route path='/*' element={<Main />} />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default Root;
