import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
const PrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [isValidUser, setValidUser] = useState(true)

    useEffect(() => {
        checkVaildToken()
    }, [])
    const config = {
        headers: {
            Authorization: `Bearer ${currentUser && currentUser.token}`
        }
    }
    const checkVaildToken = async () => {
        try {
            const res = await axios.get("/profile", config)
            console.log(res)
            if (res.status === 200) {
                setValidUser(true)
            }
            else {
                setValidUser(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {
                currentUser && isValidUser ? <Outlet /> : <Navigate to="/sign-in" />
            }
        </>
    )
}

export default PrivateRoute