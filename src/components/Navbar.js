import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userRole");
  };

  return (
    <nav className="bg-purple-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/"><div className="text-2xl font-bold">DriveSync</div></Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-lightPurple">Home</Link>
          <Link to="/driverform" className="hover:text-lightPurple">Driver Addition</Link>
          {isAuthenticated && (
            <>
              <Link to="/drivers" className="hover:text-lightPurple">Drivers</Link>
              <Link to="/vehicles" className="hover:text-lightPurple">Vehicles</Link>
              <Link to="/assignments" className="hover:text-lightPurple">Assignments</Link>
              {user && user.role === 'staff' && (
                <Link to="/driver-assignments" className="hover:text-lightPurple">My Assignments</Link>
              )}
            </>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="flex items-center space-x-2 hover:text-lightPurple">
              <FaSignOutAlt />
              <span>Log Out</span>
            </button>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 hover:text-lightPurple">
              <FaSignInAlt />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">Home</Link>
            <Link to="/driverform" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">Driver Addition</Link>
            {isAuthenticated && (
              <>
                <Link to="/drivers" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">Drivers</Link>
                <Link to="/vehicles" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">Vehicles</Link>
                <Link to="/assignments" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">Assignments</Link>
                {user && user.role === 'staff' && (
                  <Link to="/driver-assignments" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">My Assignments</Link>
                )}
              </>
            )}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple w-full text-left">
                <FaSignOutAlt className="inline-block mr-2" />
                Log Out
              </button>
            ) : (
              <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-lightPurple hover:bg-darkPurple">
                <FaSignInAlt className="inline-block mr-2" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
