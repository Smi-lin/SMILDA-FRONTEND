import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../Cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isLoggedIn, user } = useSelector((state) => state.authReducer);
  const { seller, sellerId } = useSelector((state) => state.sellerSlice);
  const { products } = useSelector((state) => state.productSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  const { wishlist } = useSelector((state) => state.wishlistSlice);
  const [SearchTerm, setSearchTerm] = useState("");
  const [SearchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishList, setOpenWishList] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (seller) {
      navigate("/dashboard"); // Navigate to the dashboard if the user is a seller
    } else {
      navigate("/shopLogin"); // Navigate to the shopLogin page otherwise
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      products &&
      products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.screenY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between px-10">
          <div>
            <Link to="/">
              <img
                src="https://api.logo.com/api/v2/images?logo=logo_eedc49c8-70d5-4c1a-aafb-b0d5811503a2&format=webp&margins=0&quality=60&width=500&background=transparent&u=1691480575"
                alt=""
                className="h-[130px] w-[60%] text-[#00b4d8]"
              />
            </Link>
          </div>
          {/* Search Bar  Box*/}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Products...."
              value={SearchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#ffe5d9] border-[2px] rounded-md"
            />
            <AiOutlineSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {SearchData && SearchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {SearchData &&
                  SearchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div className={`${styles.button}`} onClick={handleButtonClick}>
            {/* <Link to="/shopLogin"> */}
            <h1 className="text-[#fff] flex items-center">
              {/* Become Seller <IoIosArrowForward className="ml-1" /> */}
              {seller ? "Go to Dashboard" : "Become Seller"}{" "}
              <IoIosArrowForward className="ml-1" />
            </h1>
            {/* </Link> */}
          </div>
        </div>
        <div
          className={`${
            active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
          } transition hidden 800px:flex items-center justify-between w-full  bg-[#0077b6] h-[70px]`}
        >
          <div className={`p-7 relative justify-between flex `}>
            {/* Categories */}
            <div>
              <div className="relative h-[60px] mt-[15%] w-[270px] hidden 1000px:block  ">
                <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                >
                  All Categories
                </button>
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
                {dropDown ? (
                  <DropDown
                    categoriesData={categoriesData}
                    // dropDown={setActive}
                    setDropDown={setDropDown}
                  />
                ) : null}
              </div>
            </div>
            {/* Navbar Items */}
            <div
              className={`text-center justify-between flex ml-[35%] w-[100%] mt-[5%]  `}
            >
              <Navbar active={activeHeading} />
            </div>

            <div className="flex ml-[35%]">
              <div className={`${styles.noramlFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenWishList(true)}
                >
                  <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                  <span className="absolute right-0 top-0 rounded-full bg-[#f3621e] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {wishlist && wishlist.length}
                  </span>
                </div>
              </div>
              <div className={`${styles.noramlFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  onClick={() => setOpenCart(true)}
                >
                  <AiOutlineShoppingCart
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                  />
                  <span className="absolute right-0 top-0 rounded-full bg-[#f3621e] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart && cart.length}
                  </span>
                </div>
              </div>

              <div className={`${styles.noramlFlex}`}>
                <div
                  className="relative cursor-pointer mr-[15px]"
                  style={{ width: "35px", height: "35px" }}
                >
                  {isLoggedIn ? (
                    <Link to="/profile">
                      <img
                        src={user?.avatar}
                        className="w-[35px] h-[35px] rounded-full"
                        alt=""
                      />
                    </Link>
                  ) : (
                    <Link to="/login">
                      <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                    </Link>
                  )}
                </div>
              </div>
              {/* Cart Popup section */}
              {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

              {/* Wishlist popup section */}
              {openWishList ? (
                <Wishlist setOpenWishList={setOpenWishList} />
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile screen */}
      <div
        className={` ${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } w-full h-[60px]  bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
                className="mt-3 cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* HEADER SIDEBAR */}
        {open && (
          <div
            className={`  fixed w-full bg-[#000000bf] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div className="relative mr-15px]">
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute top-0 right-0 rounded-full bg-[#3bc177] w-4 h-4  text-[#fff]">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product....."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={SearchTerm}
                  onChange={handleSearchChange}
                />
                {SearchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {SearchData.map((i) => {
                      const d = i.name;

                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                           
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} />
              <div
                className={`${styles.button} ml-4 !rounded-[4px]`}
                onClick={handleButtonClick}
              >
                <h1 className="text-[#fff] flex items-center">
                  Become Seller <IoIosArrowForward className="ml-1" />
                </h1>
              </div>
              <br />
              <br />
              <br />
              <div className="flex w-full justify-center">
                {isLoggedIn ? (
                  <Link to="/profile">
                    <div>
                      <img
                        src={user.avatar}
                        style={{ height: "60px", width: "60px" }}
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#f6a655]"
                        alt=""
                      />
                    </div>
                  </Link>
                ) : (
                  <>
                    <Link
                      className="text-[18px] pr-[10px] text-[#000]"
                      to="/login"
                    >
                      Login /
                    </Link>
                    <Link className="text-[18px]  text-[#000]" to="/sign-up">
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
