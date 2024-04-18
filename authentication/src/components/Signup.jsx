/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "../App.css";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, Link } from "react-router-dom"

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            // axios.post("https://authentication-backend-hfxi.onrender.com/auth/signup", { username, email, password })
            axios.post("http://localhost:5000/auth/signup", { username, email, password })
                .then(response => {
                    if (response.data.status === true) {
                        toast.success(response.data.message, toastOptions);
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
        if (username.length <= 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("email is required", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters", toastOptions);
            return false;
        } else if (password !== confirmPassword) {
            toast.error("password and confirm password should be same.", toastOptions);
            return false;
        }
        return true;
    }
    return (
        <>
            <div className='sign-up-container'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <label htmlFor="username">Username:</label>
                    <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" autoComplete='off' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="password">Confirm password:</label>
                    <input type="password" placeholder='********' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <button type='submit'>Sign Up</button>
                    <p className='already'>Already have an account? <Link to="/login"><span>Login</span></Link></p>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
7
export default Signup