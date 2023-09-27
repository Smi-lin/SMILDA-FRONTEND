import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i?._id === data?._id);
    if (isItemExists) {
      toast.error("Item Already in Cart");
    } else {
      if (data?.stock < 1) {
        toast.error("Product stock are limited");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
      
        toast.success("Item Added to Cart Successfully");
      }
    }
  };

  return (
    <div
      className={`w-[full] block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 mb-12 `}
    >
      <div className="w-full lg:w-[50%] m-auto">
        <img
          className="h-[50vh] rounded"
          src="https://i.pinimg.com/236x/84/3d/d3/843dd301fb15b7538df7ed029e81af47.jpg"
          alt=""
        />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Curly Hair Wigs for ladies</h2>{" "}
        {/* data.name */}
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquet
          neque sit amet elit sollicitudin, <br /> eu tincidunt ligula suscipit.
          Praesent eu massa nec lectus tincidunt faucibus. Fusce id laoreet
          nisi. <br /> Pellentesque tristique mauris ac felis laoreet, a
          pellentesque turpis cursus. Nulla facilisi. Vestibulum <br />{" "}
          consequat elit eget justo ullamcorper, ac eleifend massa laoreet. Ut
          sit amet sapien eu mi hendrerit <br /> iaculis. Nunc id nunc urna.
          Integer in est nec orci blandit congue. Duis finibus feugiat
          ultricies.
          {/* data.description */}
        </p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#f3621e] pr-3 line-through">
              1200₦
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              569₦
            </h5>
          </div>
          <span className="pr-10 font-[400] text-[17px] text-[#44a55e] ">
            120 Sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/products/?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-2`}
            onClick={() => addToCartHandler(data)}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
