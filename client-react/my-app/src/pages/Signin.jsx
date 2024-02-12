import axios from 'axios';
import React, { useState } from 'react'
import OAuth from '../components/OAuth';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
const Signin = () => {

  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const { currentUser, error, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData(
      {
        ...formData,
        [e.target.id]: e.target.value
      }
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart())
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const res = await axios.post("/auth/signin", formData, config)
      console.log(res);
      if (res.status === 200) {
        dispatch(signInSuccess(res.data));
        console.log(res.data);
        res.data.userInfo.role === 'admin' ? navigate("/admin-dashboard") : navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.response.data.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signin