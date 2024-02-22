import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import Search from './pages/Search'
import Shop from './pages/Shop'
import Admindashboard from './pages/admin/Admin-Dashboard'
import AdminPrivateRoute from './pages/admin/AdminPrivateRoute'
import MainContainer from './pages/admin/MainContainer'
import OrderPage from './pages/admin/Page/OrderPage'
import ProductPage from './pages/admin/Page/Allproduct'
import EditProduct from './pages/admin/Page/EditProduct'
import AddNewProduct from './pages/admin/Page/AddNewProduct'
import SingleProduct from './pages/SingleProduct'
import Shop2 from './pages/Shop2'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
const App = () => {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>Home</Route>
        <Route path="/sign-in" element={<Signin />}> SignIn</Route>
        <Route path="/sign-up" element={<Signup />}> SignUp</Route>
        <Route path="/about" element={<About />}>About</Route>
        <Route path="/search" element={<Search />}> </Route>
        <Route path="/shop" element={<Shop />}> </Route>
        {/* <Route path="/shop2" element={<Shop2/>}> </Route> */}
        <Route path="/shop/:id" element={<SingleProduct />}></Route>
        <Route path="/checkout" element={<CheckoutPage/>}></Route>
        <Route path="app" element={<MainContainer />}>
          <Route path='order' element={<OrderPage />}></Route>
          <Route path='add-product' element={<AddNewProduct />}></Route>
          <Route path='products' element={<ProductPage />}></Route>
          <Route path='products/edit-product' element={<EditProduct />}></Route>

        </Route>
        {/* </Route> */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/create-listing" element={<CreateListing />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App