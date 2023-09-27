import React from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RxPerson } from "react-icons/rx";

const DashboardHeader = () => {
  const { sellerId } = useSelector((state) => state.sellerSlice);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img
            src="https://api.logo.com/api/v2/images?logo=logo_eedc49c8-70d5-4c1a-aafb-b0d5811503a2&format=webp&margins=0&quality=60&width=500&background=transparent&u=1691480575"
            alt=""
            className="h-[130px] w-[60%] text-[#00b4d8]"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
         
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>

          <Link to={`/shop/${sellerId}`}>
            <RxPerson
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
            {/* <img
              src={`${seller.avatar?.url}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            /> */}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
