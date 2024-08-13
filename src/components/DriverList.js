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
      <ul className="space-y-4">
        {filteredDrivers.map((driver) => (
          <li key={driver.id} className="border p-4 rounded-md">
            <div className="font-medium">{driver.name}</div>
            <div>Phone: {driver.phone}</div>
            <div>Email: {driver.email}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverList;
