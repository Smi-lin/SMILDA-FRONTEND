// // import { useSelector } from 'react-redux';
// // import  Signup  from '../components/Signup/Signup';
// // import { useNavigate } from 'react-router-dom';
// // import { useEffect } from 'react';

// // const SignupPage = () => {

// //   const navigate = useNavigate()
// //   const {isAuthenticated, user} = useSelector((state) => state.user)

// //   useEffect(() => {
// //     if(isAuthenticated === true) {
// //       navigate("/")
// //     }

// //   }, [])
// //   return (

    
// //     <div><Signup/></div>
// //   )
// // }

// // export default SignupPage

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Signup from "../components/Signup/Signup";

const SignupPage = () => {
  const navigate = useNavigate();
  const {isAuthenticated, isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if(isLoggedIn === true){
      navigate("/");
    }
  }, [])
  return (
    <div>
        <Signup />
    </div>
  )
}

export default SignupPage
