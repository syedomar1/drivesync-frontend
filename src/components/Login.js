import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [credentials, setCredentials] = useState({ emailOrPhone: '', password: '', role: 'admin' });
  const [alert, setAlert] = useState(null);
  const { isAuthenticated, login } = useContext(AuthContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const localUrl = `${process.env.REACT_APP_BACKEND_URL_LOCAL}/api/login`;
    const prodUrl = `${process.env.REACT_APP_BACKEND_URL_PROD}/api/login`;
  
    const loginRequest = async (url) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: credentials.emailOrPhone,
          password: credentials.password,
          role: credentials.role,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userId', data.userId); // Store userId in localStorage
        localStorage.setItem('userRole', data.role);  // Optional, if needed
        return data;
      } else {
        console.error('Login failed:', await response.json());
        return { message: 'Login failed' };
      }
    };
  
    try {
      const json = await loginRequest(localUrl);
      if (json.message === 'Logged in successfully') {
        setAlert({ message: 'Logged In Successfully', type: 'success' });
        localStorage.setItem('userId', json.userId); // Ensure userId is stored
        localStorage.setItem('userRole', json.role); // Store role if needed
        login({ name: json.username, role: json.role });
        navigate(json.role === 'admin' ? '/' : '/driverform');
        toast.success('Logged in successfully!', {
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
        setAlert({ message: 'Invalid Details', type: 'danger' });
        toast.error("Error Logging in", {
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
      console.warn('Local backend failed, trying production backend', error);
      try {
        const json = await loginRequest(prodUrl);
        if (json.message === 'Logged in successfully') {
          setAlert({ message: 'Logged In Successfully', type: 'success' });
          localStorage.setItem('userId', json.userId); // Ensure userId is stored
          localStorage.setItem('userRole', json.role); // Store role if needed
          login({ name: json.username, role: json.role });
          navigate(json.role === 'admin' ? '/' : '/driverform');
          toast.success('Logged in successfully!', {
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
          setAlert({ message: 'Invalid Details', type: 'danger' });
          toast.error("Invalid Details", {
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
        setAlert({ message: 'Incorrect Email ID or Password', type: 'danger' });
        toast.error("Incorrect Email ID or Password", {
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
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-2 px-4 sm:px-6 lg:px-8">
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
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="mx-auto text-3xl font-bold text-darkPurple">DriveSync</h1>
          <h2 className="mt-6 text-2xl font-semibold text-gray-800">Sign in to your account</h2>
        </div>

        {alert && (
          <div className={`mt-4 text-sm ${alert.type === 'danger' ? 'text-red-500' : 'text-green-500'}`}>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="emailOrPhone" className="sr-only">Email or Phone</label>
              <input
                type="text"
                id="emailOrPhone"
                name="emailOrPhone"
                value={credentials.emailOrPhone}
                onChange={onChange}
                required
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightPurple focus:border-lightPurple sm:text-sm"
                placeholder="Email address or Phone Number"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lightPurple focus:border-lightPurple sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={onChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-lightPurple focus:border-lightPurple sm:text-sm"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-lightPurple focus:ring-lightPurple border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-lightPurple hover:bg-lightPurple/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lightPurple"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-lightPurple font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
