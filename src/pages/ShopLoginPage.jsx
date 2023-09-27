// import React, { useEffect } from 'react'
// import ShopLogin from "../components/Shop/ShopLogin"
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ShopLoginPage = () => {

//   const navigate = useNavigate();
//   const { isSeller, seller } = useSelector((state) => state.seller);

//   useEffect(() => {
//     if(isSeller === true){
//       navigate(`/shop/${seller._id}`);
//     }
//   }, [])

//   return (
//     <div>
//       <ShopLogin/>
//     </div>
//   )
// }

// export default ShopLoginPage


import React, { useEffect } from 'react';
import ShopLogin from "../components/Shop/ShopLogin";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {

  const navigate = useNavigate();
  const { seller}  = useSelector((state) => state.sellerSlice);
  console.log(seller);

  useEffect(() => {
    if (seller === true)    {
      navigate(`/dashboard`);
    }


  }, [seller]); // Add isSeller and seller to the dependency array

  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
