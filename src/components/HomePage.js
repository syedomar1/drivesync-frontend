import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-darkPurple text-white py-28">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between md:pl-24">
          {/* Left-side welcome text */}
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl font-bold md:pr-2">Welcome to DriveSync - A Vehicle-Driver Mapping System</h1>
            <p className="text-xl mt-4">Effortlessly & Effeciently manage your fleet and drivers.</p>
            <Link
              to="/login"
              className="inline-block bg-lightPurple text-darkPurple py-2 px-6 mt-6 rounded hover:bg-white hover:text-lightPurple"
            >
              Get Started
            </Link>
          </div>

          {/* Right-side cards in a column */}
          <div className="md:w-1/2 flex flex-col space-y-8 items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-full md:w-3/4"
            >
              <Link to="/driverform" className="no-underline">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 text-center">
                    <h5 className="text-2xl font-semibold text-darkPurple">Driver Creation</h5>
                    <p className="mt-2 text-gray-700">Add new drivers and manage their profiles with ease.</p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full md:w-3/4"
            >
              <Link to="/vehicles" className="no-underline">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 text-center">
                    <h5 className="text-2xl font-semibold text-darkPurple">Vehicle Management</h5>
                    <p className="mt-2 text-gray-700">View and manage all vehicles in your fleet effortlessly.</p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-full md:w-3/4"
            >
              <Link to="/assignments" className="no-underline">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="p-6 text-center">
                    <h5 className="text-2xl font-semibold text-darkPurple">Assignments</h5>
                    <p className="mt-2 text-gray-700">Assign drivers to vehicles and manage schedules.</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-lightPurple text-center py-6">
        <div className="container mx-auto">
          <p className="text-darkPurple">&copy; 2024 Vehicle-Driver Mapping System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;