/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (localStorage.getItem("user"));
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        // axios.get('https://authentication-backend-hfxi.onrender.com/auth/verify', {
        //     headers: {
        //         'Authorization': user && `Bearer ${user.token}`
        //     }
        // })
            axios.get('http://localhost:5000/auth/verify', {
                headers: {
                    Authorization: user && `Bearer ${user.token}`
                }
            })
            .then(res => {
                if (res.data.status) {
                    console.log("res dashboard:", res);
                } else {
                    navigate("/");
                }
            }).catch(err =>
                console.log(err)
            );
    }, []);

    return (
        <div className='dashboard'>
            Welcome to Dashboard
            <Link to='/'><button>Home</button></Link>
        </div>
    )
}

export default Dashboard