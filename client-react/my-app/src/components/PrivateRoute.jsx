import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [isValidUser, setValidUser] = useState(false)
    const nav = useNavigate()
    useEffect(() => {
        const checkVaildToken = async () => {
            try {
                if (isValidUser === false) {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${currentUser && currentUser.token}`
                        }
                    }
                    let res = await axios.get("/profile", config)
                    console.log(res);
                    if (res.status === 200) {
                        // setValidUser(true)
                        nav('/')
                    }
                    else {
                        setValidUser(false)
                        nav('/sign-in')
                    }
                }
                nav('/profile')
            } catch (error) {
                console.log(error);
            }
        }
        checkVaildToken();
    }, [1])


    return (
        <>
            {
                currentUser  ? <Outlet /> : <Navigate to="/sign-in" />
            }
        </>
    )
}

export default PrivateRoute