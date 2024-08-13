import React, { useState } from 'react';

const DriverList = ({ drivers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter((driver) =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.phone.includes(searchTerm)
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-darkPurple">Driver List</h2>
      <input
        type="text"
        placeholder="Search by name or phone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDrivers.map((driver) => (
          <div key={driver.id} className="border p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="font-medium text-darkPurple">{driver.name}</div>
            <div>Phone: {driver.phone}</div>
            <div>Email: {driver.email}</div>
            <div>Location: {driver.location}</div>
            <div>Shift: {driver.shift}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverList;
