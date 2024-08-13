// components/DriverAssignments.js
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DriverAssignments = ({ userId }) => {
  const [requests, setRequests] = useState([]);
  const API_URL = process.env.REACT_APP_BACKEND_URL_PROD || process.env.REACT_APP_BACKEND_URL_LOCAL;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${API_URL}/api/assignment-requests/driver/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch assignment requests');
        }
        const data = await response.json();
        setRequests(data);
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

    fetchRequests();
  }, [userId]);

  const respondToRequest = async (requestId, response) => {
    try {
      const res = await fetch(`${API_URL}/api/assignment-requests/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, response }),
      });
      if (!res.ok) {
        throw new Error('Failed to respond to assignment request');
      }
      toast.success(`Request ${response}`, {
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

      // Update request list after response
      setRequests(requests.filter(request => request._id !== requestId));
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-darkPurple">Your Assignment Requests</h2>
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
      {requests.length === 0 ? (
        <p>No pending assignment requests.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(request => (
            <li key={request._id} className="bg-white p-4 rounded-lg shadow-md">
              <p>Vehicle: {request.assignment.vehicleId.licensePlate}</p>
              <p>Shift: {new Date(request.assignment.startTime).toLocaleString()} - {new Date(request.assignment.endTime).toLocaleString()}</p>
              <div className="mt-4">
                <button
                  onClick={() => respondToRequest(request._id, 'accepted')}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => respondToRequest(request._id, 'rejected')}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DriverAssignments;
