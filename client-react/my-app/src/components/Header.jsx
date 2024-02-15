import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addSearchKeyword } from '../redux/product/productSlice';

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [keyword, setKeyword] = useState("")
    const { currentUser } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(addSearchKeyword(keyword))
    }, [keyword])
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const urlParams = new URLSearchParams(window.location.search)
    //     urlParams.set('searchTerm', searchTerm);
    //     const searchQuery = urlParams.toString();
    //     console.log(searchQuery);
    //     navigate(`/search/${searchQuery}`)
    // }
    // useEffect(() => {
    //     let timerOut = setTimeout(() => {
    //         searchProduct()
    //     }, 2000)
    //     return () => clearTimeout(timerOut)

    // }, [searchTerm])
    // // debounce
    // // let timerOut = null;
    // // const handleSearchTerm = () => {
    // //     if (timerOut) {
    // //         clearTimeout(timerOut);
    // //     }
    // //     timerOut = setTimeout(() => {
    // //         searchProduct()
    // //     }, 2000)

    // // }
    // const searchProduct = async () => {
    //     const res = await axios.get(`/products/search/query?searchTerm=${searchTerm}`)
    //     console.log(res.data);

    // }


    return (
        <header className='bg-[#002140] shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Shop</span>
                        <span className='text-slate-700'>365</span>
                    </h1>
                </Link>
                {

                    currentUser &&
                        currentUser.userInfo.role === 'admin' ? <h3 className='text-slate-500 font-bold text-sm sm:text-xl flex flex-wrap'>Admin</h3> :
                        <form  className='bg-slate-100 p-3 rounded-lg flex items-center'>
                            <input
                                type='text'
                                placeholder='Search...'
                                className='bg-transparent focus:outline-none w-24 sm:w-64'
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <button>
                                <FaSearch className='text-slate-600' />
                            </button>
                        </form>
                }
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='text-white font-semibold cursor-pointer hover:bg-cyan-600'>
                            Home
                        </li>
                    </Link>
                    {currentUser &&
                        currentUser.userInfo.role === 'admin' ? <Link to='app'>
                        <li className='text-white font-semibold cursor-pointer hover:bg-cyan-600'>
                             Dashboard
                        </li>
                    </Link> :
                        <>
                            <Link to='/shop'>
                                <li className='text-white font-semibold cursor-pointer hover:bg-cyan-600'>
                                    Shop
                                </li>
                            </Link>
                            <Link to='/about'>
                                <li className='text-white font-semibold cursor-pointer hover:bg-cyan-600'>
                                    About
                                </li>
                            </Link>
                        </>}
                    <Link to={currentUser ? "/profile" : "/sign-in"}>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.userInfo.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className='text-white font-semibold cursor-pointer hover:bg-cyan-600 '> Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header