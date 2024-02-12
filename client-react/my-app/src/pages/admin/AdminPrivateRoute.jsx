import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const AdminPrivateRoute = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [isAdmin, setAdmin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        console.log(currentUser);
        if (currentUser.userInfo.role === 'admin') {
            setAdmin(true)
            navigate("app");
        }
    })

    return (
        <div>
            {
                currentUser && isAdmin ? <Outlet /> : <Navigate to="/" />
            }
        </div>
    )
}

export default AdminPrivateRoute