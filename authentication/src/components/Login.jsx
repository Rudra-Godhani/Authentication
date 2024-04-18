/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import "../App.css";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, Link } from "react-router-dom"

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        if (handleValidation()) {
            // axios.post("https://authentication-backend-hfxi.onrender.com/auth/login", { email, password })
            axios.post("http://localhost:5000/auth/login", { email, password })
                .then(response => {
                    console.log(response);
                    if (response.data.status === true) {
                        console.log(response.data.message);
                        localStorage.setItem("user", JSON.stringify(response.data.user));

                        toast.success(response.data.message, toastOptions);
                        navigate('/');
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
            toast.error("email and password is required", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("email and password is required", toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <div className='sign-up-container'>
                <form className='sign-up-form' onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label htmlFor="email">Email:</label>
                    <input type="email" autoComplete='off' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password:</label>
                    <input type="password" placeholder='********' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button type='submit'>login</button>
                    <Link to="/forgotPassword"><span>Forgot Password?</span></Link>
                    <p className='already'>Dont Have an Account? <Link to="/signup"><span>Sign Up</span></Link></p>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Login