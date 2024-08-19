import React, { useState } from 'react'
import MailSent from '../components/MailSent'
import axios from 'axios'
const ForgetPassword = () => {
    const [loading, setLoading] = useState("")
    const [email, setMail] = useState("")
    const [mailSent, setMailSent] = useState(true)
    const [error, setError] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const res = await axios.post("/auth/forget-password", { email }, config)
            console.log(res);

            setMailSent(false)
        } catch (error) {
            console.log(error);
            setError(error.response.data.message);

        }
    }
    return (
        <div className='max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md'>
            {mailSent ?
                <div>
                    <h1 className='text-3xl text-center font-semibold my-7'>Enter Email Account</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                        <input
                            type='email'
                            placeholder='email'
                            className='border p-3 rounded-lg'
                            value={email}
                            onChange={(e) => setMail(e.target.value)}
                        />
                        <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>
                            Send Email
                        </button>
                    </form>
                    {error && <p className='text-red-500 mt-5'>{error}</p>}
                </div>

                :
                <div>
                    <MailSent email={email}></MailSent>
                </div>
            }

        </div>
    )
}

export default ForgetPassword