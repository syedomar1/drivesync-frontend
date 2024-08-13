import React, { useState } from 'react';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DriverForm = ({ addDriver }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [shift, setShift] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDriver = { name, email, phone, location, shift };
    const API_URL = process.env.REACT_APP_BACKEND_URL_PROD || process.env.REACT_APP_BACKEND_URL_LOCAL;

    try {
      const response = await fetch(`${API_URL}/api/drivers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDriver),
      });

      if (response.ok) {
        const savedDriver = await response.json();
        addDriver(savedDriver);
        setName('');
        setEmail('');
        setPhone('');
        setLocation('');
        setShift('');
        toast.success('Driver added successfully!', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        const error = await response.json();
        console.error('Failed to create driver:', error);
        toast.error(error.message || 'Failed to create driver', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className="text-2xl font-bold mb-4 text-darkPurple">Add New Driver</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="location" className="block text-sm font-medium">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="shift" className="block text-sm font-medium">Shift</label>
        <select
          id="shift"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select Shift</option>
          <option value="12am-8am">12am-8am</option>
          <option value="8am-4pm">8am-4pm</option>
          <option value="4pm-12am">4pm-12am</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-darkPurple text-white py-2 rounded-lg">Add Driver</button>
    </form>
  );
};

export default DriverForm;
