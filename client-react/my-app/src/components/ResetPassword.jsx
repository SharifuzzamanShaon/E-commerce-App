import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetCredentials, setResetCredentials] = useState({ email: "", token: "" })
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const token = params.get('token');
    setResetCredentials({ email: email, token: token })
  }, [location])

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        setError('');
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        }
        const res = await axios.post(`/auth/reset-password?email=${resetCredentials.email}&token=${resetCredentials.token}`, { newPassword: password }, config)
        console.log(res);
        if(res.status =200) {
          alert('Password Reset Success, Please Sign-in')
          navigate('/sign-in');  
        } 
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error);

    }
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Confirm your password"
            required
          />
          <div className='mb-4'>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={toggleShowPassword}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Show password</span>
            </label>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
