import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DriverForm from './components/DriverForm';
import VehicleList from './components/VehicleList';
import DriverList from './components/DriverList';
import AssignmentForm from './components/AssignmentForm';
import Homepage from './components/HomePage';
import Login from './components/Login';
import { AuthProvider } from "./components/AuthContext";
import DriverAssignments from './components/DriverAssignments';

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userId = localStorage.getItem("_id"); // Retrieve user ID from local storage
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL_PROD || process.env.REACT_APP_BACKEND_URL_LOCAL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversResponse = await fetch(`${API_URL}/api/drivers`);
        const vehiclesResponse = await fetch(`${API_URL}/api/vehicles`);
        const driversData = await driversResponse.json();
        const vehiclesData = await vehiclesResponse.json();
        setDrivers(driversData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [API_URL]);

  const addDriver = (newDriver) => setDrivers([...drivers, newDriver]);
  const assignDriver = (vehicleId, driverId) => {
    setVehicles(vehicles.map(vehicle => vehicle._id === vehicleId ? { ...vehicle, assignedDriver: driverId } : vehicle));
  };
  const unassignDriver = (vehicleId) => {
    setVehicles(vehicles.map(vehicle => vehicle._id === vehicleId ? { ...vehicle, assignedDriver: null } : vehicle));
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto px-4 min-h-screen bg-lightPurple text-darkPurple">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/driverform" element={<DriverForm addDriver={addDriver} />} />
            <Route path="/drivers" element={<DriverList drivers={drivers} />} />
            <Route path="/assignments" element={<AssignmentForm vehicles={vehicles} drivers={drivers} assignDriver={assignDriver} />} />
            <Route path="/driver-assignments" element={<DriverAssignments userId={userId} />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/vehicles" 
              element={<VehicleList vehicles={vehicles} assignDriver={assignDriver} unassignDriver={unassignDriver} drivers={drivers} />} 
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
