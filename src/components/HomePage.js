import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-darkPurple text-white text-center py-12">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Welcome to DriveSync - A Vehicle-Driver Mapping System</h1>
          <p className="text-xl mt-4">Efficiently manage your fleet and drivers with our platform.</p>
          <Link to="/login" className="inline-block bg-lightPurple text-darkPurple py-2 px-6 mt-6 rounded hover:bg-white hover:text-lightPurple">
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-16 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                <Link to="/driverform" className="no-underline">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6 text-center">
                      <h5 className="text-2xl font-semibold">Driver Creation</h5>
                      <p className="mt-2 text-gray-700">Add new drivers and manage their profiles with ease.</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-full md:w-1/3 px-4 mb-8 md:mb-0">
                <Link to="/vehicles" className="no-underline">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6 text-center">
                      <h5 className="text-2xl font-semibold">Vehicle Management</h5>
                      <p className="mt-2 text-gray-700">View and manage all vehicles in your fleet effortlessly.</p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-full md:w-1/3 px-4">
                <Link to="/assignments" className="no-underline">
                  <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="p-6 text-center">
                      <h5 className="text-2xl font-semibold">Assignments</h5>
                      <p className="mt-2 text-gray-700">Assign drivers to vehicles and manage schedules.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-lightPurple text-center py-6">
        <div className="container mx-auto">
          <p className="text-darkPurple">&copy; 2024 Vehicle-Driver Mapping System. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .hover-card:hover {
          background-color: #f8f9fa;
          transform: translateY(-5px);
          transition: all 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Homepage;
