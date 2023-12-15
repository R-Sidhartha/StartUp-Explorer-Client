import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black p-4 ">
      <div className='flex items-center justify-between mx-10'>
      <Link to="/" className="text-white text-xl font-bold">
        StartUp Explorer
      </Link>

      {/* Navigation Links */}
      <nav className="space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
      </nav>
      </div>
    </header>
  );
};

export default Header;