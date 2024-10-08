import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import OAuth from '../components/OAuth';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const {currentUser, error, loading} = useSelector((state)=>state.user);
  const {signInPorcess, setSignProcess} = useState(false);
  const navigate = useNavigate();
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
    try {
      if (!formData.username) {
        console.log("Insert username");
      }
      if (!formData.email) {
        console.log("Insert email");
      }
      dispatch(signInStart())
      const res = await axios.post("/auth/signup", formData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
      console.log(res);
      console.log(res.data);
      if (res.status === 201) {
        console.log("koj");
        dispatch(signInSuccess(res.data))
        navigate("/sign-in")
        setSignProcess(true)
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.response.data.error[0]))
    }
  }

  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
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
          {loading && signInPorcess ? 'Loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>

      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default Signup