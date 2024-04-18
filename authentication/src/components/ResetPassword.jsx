/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import axios from "axios";

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const { token } = useParams();

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            // axios.post("https://authentication-backend-hfxi.onrender.com/auth/reset-password/" + token, { password })
            axios.post("http://localhost:5000/auth/reset-password/" + token, { password })
                .then(response => {
                    if (response.data.status === true) {
                        toast.success("Password updated successfullly", toastOptions);
                        alert("Password updated successfullly");
                        navigate('/login');
                    }
                    if (response.data.status === false) {
                        toast.error(response.data.message, toastOptions);
                    }
                }).catch(err => {

                })
        }
    }

    const handleValidation = () => {
        if (password === "") {
            toast.error("Please enter your password", toastOptions);
            return false;
        }
        return true;
    }
    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <h2>Reset Password</h2>

                <label htmlFor="password">New Password:</label>
                <input type="password" placeholder='******' value={password} onChange={(e) => setPassword(e.target.value)} />

                <button type='submit'>Reset</button>
            </form>
        </div>
    )
}

export default ResetPassword
