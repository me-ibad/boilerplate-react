import React from 'react';
import history from '../history';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';
import Auth from './Auth';

function Root() {
  return (
    <Router history={history}>
      <Routes>
        <Route path='/*' element={<Main />} />
        <Route path='auth/*' element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default Root;
