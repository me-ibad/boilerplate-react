import React from 'react';
import Dashboard from 'admin/Dashboard';
import Users from 'admin/Users';
function Admin() {
  return (
    <>
      <Routes>
        <Route>
          <Route path='adduser' element={<Dashboard />} />
          <Route path='addrole' element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}

export default Admin;
