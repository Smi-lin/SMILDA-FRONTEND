// import React, { useEffect } from 'react'
// import ShopCreate from "../components/Shop/ShopCreate"
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ShopCreatePage = () => {

//   const navigate = useNavigate();
//   const { isSeller, seller } = useSelector((state) => state.seller);

//   useEffect(() => {
//     if(isSeller === true){
//       navigate(`/shop/${seller._id}`);
//     }
//   }, [])

//   return (
//     <div>
//       <ShopCreate/>
//     </div>
//   )
// }

// export default ShopCreatePage


import React, { useEffect } from 'react';
import ShopCreate from "../components/Shop/ShopCreate";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopCreatePage = () => {

  const navigate = useNavigate();
  const   {seller } = useSelector((state) => state.sellerSlice);

  useEffect(() => {
    if (seller === true) {
      navigate(`/dashboard}`);
    }
  }, [ seller]); // Add isSeller and seller to the dependency array

  return (
    <div>
      <ShopCreate/>
    </div>
  );
};

export default ShopCreatePage;
