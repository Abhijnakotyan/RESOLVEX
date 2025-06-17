import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">ResolveX</h1>
    <div className="space-x-4">
      <Link to="/">Login</Link>
      <Link to="/department">Department</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/history">History</Link>
    </div>
  </nav>
);

export default Navbar;