import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../../firebase'
import axios from 'axios'
import { userDeleteFailde, userDeleteStarted, userDeleteSuccess, userSignOut, userUpdateFaided, userUpdateSuccess } from '../redux/user/userSlice'
const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user)
  const [passwordType, setPasswordType] = useState("password");
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser.userInfo.username,
    email: currentUser.userInfo.email,
    password: currentUser.userInfo.password,
    avatar: currentUser.userInfo.avatar
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const handleListingDelete = () => { }
  const handleShowListings = () => { }
  const handleChange = (e) => { setFormData({ ...formData, [e.target.id]: e.target.value }) }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(userUpdateFaided())
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${currentUser.token}`
        }
      }
      console.log(currentUser.token);
      const res = await axios.put(`/user/update/${currentUser.userInfo._id}`, formData, config)
      dispatch(userUpdateSuccess(res.data))
      console.log(res);
    } catch (error) {
      dispatch(userUpdateFaided(error.response.data.message))
      // console.log(error);
    }
  }
  const handleDeleteUser = async () => {
    dispatch(userDeleteStarted())
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`
        }
      }
      const res = await axios.delete(`/user/delete/${currentUser.userInfo._id}`, config)
      console.log("DELETING User");
      console.log(res);
      dispatch(userDeleteSuccess(res.data))
    } catch (error) {
      console.log(error);
      dispatch(userDeleteFailde(error))
    }
  }
  const handleSignOut = () => {
    navigate('/');
    dispatch(userSignOut())
  }
  const fileRef = useRef(null)
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  }
  const togglePassword = () => {
    // if (passwordType === "password") {
    //   setPasswordType("text")
    //   return;
    // }
    // setPasswordType("password")
    setPasswordType(passwordType === "password" ? "text" : "password");

  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={currentUser.userInfo.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          // defaultValue={currentUser.userInfo.username}
          value={formData.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          // defaultValue={currentUser.userInfo.email}
          value={formData.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type={passwordType}
          placeholder='password'
          value={formData.password}
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button className="btn btn-outline-primary" onClick={togglePassword}>
          {passwordType === "password" ? "show" : "Hide"}
        </button>
        <button onClick={handleSubmit}
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer'
        >
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div>

      {/* {error && <p className='text-red-500 mt-5'>{error}</p>} */}
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>
        Show Listings
      </button>
      <p className='text-red-700 mt-5'>
        {/* {showListingsError ? 'Error showing listings' : ''} */}
      </p>

      {/* userListings && userListings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          { userListings.map((listing) => (
            <div
              // key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              { <Link to={`/listing/${listing._id}`}>
                <img
                  // src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))} }
        </div>
          )*/}
    </div>

  )
}

export default Profile