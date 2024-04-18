/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios";

function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
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
            // axios.post("https://authentication-backend-hfxi.onrender.com/auth/forgot-password", { email })
            axios.post("http://localhost:5000/auth/forgot-password", { email })
                .then(response => {
                    if (response.data.status === true) {
                        toast.success("we are sending email for reset password, please wait!", toastOptions);
                        alert("check your email for reset password link");
                        navigate('/login');
                    }
                    if (response.data.status === false) {
                        toast.error(response.data.message, toastOptions);
                    }

                }).catch(err => {
                    console.log(err);

                })
        }
    }

    const handleValidation = () => {
        if (email === "") {
            toast.error("Please enter your email", toastOptions);
            return false;
        }
        return true;
    }
    return (
        <>
            <div className='sign-up-container'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h2>Forgot Password</h2>

                    <label htmlFor="email">Email:</label>
                    <input type="email" autoComplete='off' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <button type='submit'>Send</button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default ForgotPassword
