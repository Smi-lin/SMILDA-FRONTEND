import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/wishlistSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/cartSlice";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isReview }) => {
  const { wishlist } = useSelector((state) => state.wishlistSlice);
  const { cart } = useSelector((state) => state.cartSlice);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      console.log(wishlist.find((i) => i._id === data._id))
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);


  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data._id));
  };
  
  const addToWishlistHandler = (data) => {
    dispatch(addToWishlist(data));
  };
  console.log(click)


  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i?._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm relative cursor-pointer px-9">
        <div className="flex justify-center"></div>
        <Link to={`/products/${data._id}`}>
          <img
            src={`${data.images && data.images[0]?.url || data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/products/${data._id}`}>
          <h4 className="pb-3 font-[500]">
            {data.name?.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
          <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-start justify-between">
            <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                  ₦
              </h5>
              <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + "₦" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d1f7]">
            {data?.sold_out} sold
            </span>
          </div>
        </Link>
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={"red"}
              title="Remove from Wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={"#333"}
              title="Add to Wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick View"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to Cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
