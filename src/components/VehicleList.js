import React, { useState } from 'react';

const VehicleList = ({ drivers, vehicles, setDrivers, setVehicles }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDriver, setSelectedDriver] = useState({});
  const API_URL = process.env.REACT_APP_BACKEND_URL_PROD || process.env.REACT_APP_BACKEND_URL_LOCAL;

  const handleAssign = async (vehicleId, driverId) => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/${vehicleId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ driverId }),
      });
      if (response.ok) {
        window.location.reload();  // Reload the page
      } else {
        console.error('Failed to assign driver');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUnassign = async (vehicleId) => {
    try {
      const response = await fetch(`${API_URL}/api/vehicles/${vehicleId}/unassign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        window.location.reload();  // Reload the page
      } else {
        console.error('Failed to unassign driver');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDriverChange = (vehicleId, driverId) => {
    setSelectedDriver(prev => ({ ...prev, [vehicleId]: driverId }));
  };

  const filteredVehicles = vehicles.filter((vehicle) =>
    vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-darkPurple">Vehicle List</h2>
      <input
        type="text"
        placeholder="Search by Make, Model, or License Plate"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <ul className="space-y-4">
        {filteredVehicles.map((vehicle) => (
          <li key={vehicle._id} className="border p-4 rounded-md">
            <div className="font-medium">
              {vehicle.make} {vehicle.model} ({vehicle.licensePlate})
            </div>
            <div>
              {vehicle.assignedDriver ? (
                <div className="flex items-center">
                  <span>Assigned to: {vehicle.assignedDriver.name}</span>
                  <button
                    onClick={() => handleUnassign(vehicle._id)}
                    className="ml-4 bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Unassign Driver
                  </button>
                </div>
              ) : (
                <div className="flex items-center">
                  <select
                    onChange={(e) => handleDriverChange(vehicle._id, e.target.value)}
                    value={selectedDriver[vehicle._id] || ""}
                    className="border p-2 rounded"
                  >
                    <option value="">Select Driver</option>
                    {drivers
                      .filter(driver => driver.available)
                      .map(driver => (
                        <option key={driver._id} value={driver._id}>
                          {driver.name}
                        </option>
                      ))}
                  </select>
                  <button
                    onClick={() => selectedDriver[vehicle._id] && handleAssign(vehicle._id, selectedDriver[vehicle._id])}
                    disabled={!selectedDriver[vehicle._id]}
                    className={`ml-4 py-1 px-2 rounded ${selectedDriver[vehicle._id] ? 'bg-darkPurple text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                  >
                    Assign Driver
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VehicleList;
