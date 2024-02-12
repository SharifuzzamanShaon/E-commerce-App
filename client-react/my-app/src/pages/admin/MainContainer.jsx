import React from 'react'
import { Outlet } from 'react-router-dom'
import Admindashboard from './Admin-Dashboard'
import './style.css'
import ProductPage from './Page/Allproduct'
import OrderPage from './Page/OrderPage'
const MainContainer = () => {
  return (
    <div className='main-container'>
      <Admindashboard />
      <Outlet />
    </div>
  )
}

export default MainContainer