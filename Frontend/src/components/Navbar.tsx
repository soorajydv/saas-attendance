import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">School Admin Panel</h1>
        <ul className="flex space-x-4">
          <li><Link to="/" className="hover:underline">Dashboard</Link></li>
          <li><Link to="/students" className="hover:underline">Students</Link></li>
          <li><Link to="/teachers" className="hover:underline">Teachers</Link></li>
          <li><Link to="/classes" className="hover:underline">Classes</Link></li>
          <li><Link to="/buses" className="hover:underline">Buses</Link></li>
          <li><Link to="/analytics" className="hover:underline">Analytics</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;