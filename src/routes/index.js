import React from 'react';
import history from '../history';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './Main';

function Root() {
  return (
    <Router history={history}>
      <Routes>
        <Route path='/*' element={<Main />} />
      </Routes>
    </Router>
  );
}

export default Root;
