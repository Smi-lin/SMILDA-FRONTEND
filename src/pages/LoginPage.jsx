// // import { useEffect } from 'react';
// // import  Login  from '../components/Login/Login.jsx';
// // import { useSelector } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';

// // const LoginPage = () => {

// //   const navigate = useNavigate()
// //   const {isAuthenticated, user} = useSelector((state) => state.user)

// //   useEffect(() => {
// //     if(isAuthenticated === true) {
// //       navigate("/")
// //     }

// //   }, [])
  

// //   return (
// //     <div>
// //       <Login/>
// //     </div>
// //   )
// // }

// // export default LoginPage


// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import Login from '../components/Login/Login.jsx';

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.user);

//   useEffect(() => {
//     checkAuthenticationStatus();
//   }, []);

//   const checkAuthenticationStatus = () => {
//     if (isAuthenticated === true) {
//       navigate("/");
//     }
//   };

//   return (
//     <div>
//       <Login />
//     </div>
//   );
// };

// export default LoginPage;

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../components/Login/Login.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if(isLoggedIn === true){
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  
  return (
    <div>
        <Login />
    </div>
  )
}

export default LoginPage;
