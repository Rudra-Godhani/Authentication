/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState();
  const [user, setUser] = useState(null);

  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    // axios.get('https://authentication-backend-hfxi.onrender.com/auth/logout')
    axios.get('http://localhost:5000/auth/logout')
      .then(res => {
        if (res.data.status) {
          localStorage.clear();
          navigate("/login");
        }
      }).catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    if (localStorage.getItem("user"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  useEffect(() => {

    // axios.get('https://authentication-backend-hfxi.onrender.com/auth/verify',{
    //   headers: {
    //     'Authorization': user && `Bearer ${user.token}`
    //   }
    // })
    axios.get('http://localhost:5000/auth/verify', {
      headers: {
        'Authorization': user && `Bearer ${user.token}`
      }
    })
      .then(res => {
        if (res.data.status === true) {
          setIsAuthorized(true);
        } else {
          navigate("/");
        }
      }).catch(err =>
        console.log(err)
      );
  }, []);


  return (
    <div className='home-container'>
      <div className='heading'>
        {
          user
            ? `Welcome, ${user.username}`
            : "Welcome"
        }
      </div>
      <Link to="/dashboard"><button>Dashboard</button></Link>
      {
        isAuthorized
          ? <button onClick={handleLogout}>
            Logout
          </button>
          : <button onClick={() => navigate("/login")}>Login</button>
      }
    </div>
  )
}

export default Home
