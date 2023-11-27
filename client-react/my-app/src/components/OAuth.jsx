import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
const OAuth = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleGoogleClick = async () => {
        dispatch(signInStart())
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log(result);
            const userInfo = {
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            }
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.post("/auth/google", userInfo, config)
            console.log(res);
            if(res.status===201 || 200){
                dispatch(signInSuccess(res.data));
                navigate("/");
            }
        } catch (error) {
            dispatch(signInFailure(error.response.data.message))
        }

    }
    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
        >
            Continue with google
        </button>
    )
}

export default OAuth