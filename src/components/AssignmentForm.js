import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignmentForm = ({ vehicles, drivers, assignDriver }) => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [driverDetails, setDriverDetails] = useState(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL_PROD || process.env.REACT_APP_BACKEND_URL_LOCAL;

  useEffect(() => {
    if (selectedDriver) {
      // Fetch driver details (including assignments)
      const fetchDriverDetails = async () => {
        try {
          const response = await fetch(`${API_URL}/api/drivers/${selectedDriver}`);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to fetch driver details');
          }
          const data = await response.json();
          setDriverDetails(data);
        } catch (error) {
          toast.error('Error fetching driver details', {
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
      };

      fetchDriverDetails();
    }
  }, [selectedDriver]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const assignment = { driverId: selectedDriver, vehicleId: selectedVehicle, startTime, endTime };
  
    try {
      const response = await fetch(`${API_URL}/api/assignments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignment),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create assignment');
      }
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
      assignDriver(assignment);
      // Clear form fields
      setSelectedDriver('');
      setSelectedVehicle('');
      setStartTime(new Date());
      setEndTime(new Date());
    } catch (error) {
      toast.error(error.message, {
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
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-darkPurple">Assign Driver to Vehicle</h2>
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
      <div className="mb-4">
        <label htmlFor="vehicle" className="block text-sm font-medium">Select Vehicle</label>
        <select
          id="vehicle"
          value={selectedVehicle}
          onChange={(e) => setSelectedVehicle(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Choose a vehicle</option>
          {vehicles.map((vehicle) => (
            <option key={vehicle._id} value={vehicle._id}>
              {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="driver" className="block text-sm font-medium">Select Driver</label>
        <select
          id="driver"
          value={selectedDriver}
          onChange={(e) => setSelectedDriver(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Choose a driver</option>
          {drivers.map((driver) => (
            <option key={driver._id} value={driver._id}>
              {driver.name} ({driver.phone}) - Shift: {driver.shift}
            </option>
          ))}
        </select>
      </div>

      {driverDetails && driverDetails.assignments && driverDetails.assignments.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium">Current Assignments</label>
          <ul className="list-disc pl-5 mt-2">
            {driverDetails.assignments.map((assignment, index) => (
              <li key={index}>
                Vehicle: {assignment.vehicleId.licensePlate}, From: {new Date(assignment.startTime).toLocaleString()}, To: {new Date(assignment.endTime).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="startTime" className="block text-sm font-medium">Start Time</label>
        <DatePicker
          selected={startTime}
          onChange={(date) => setStartTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endTime" className="block text-sm font-medium">End Time</label>
        <DatePicker
          selected={endTime}
          onChange={(date) => setEndTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button type="submit" className="w-full bg-darkPurple text-white py-2 rounded-lg">Assign Driver</button>
    </form>
  );
};

export default AssignmentForm;
