import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import { pass } from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";

const ShopSettings = () => {
  const { seller,sellerId } = useSelector((state) => state.sellerSlice);

  console.log(seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const dispatch = useDispatch();

  const handleImage = async (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setAvatar(files);

    const formData = new FormData();

    formData.append("image", e.target.files[0]);

    await axios
      .put(`${pass}/updateShopAvatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        dispatch(loadSeller());
        toast.success("Avatar updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${pass}/updateSellerInfo`,
        {
          name,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop Info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              src={
                avatar ? URL.createObjectURL(avatar) : `https://ln.run/d0Lxm`
              }
              className="w-[200px] h-[200px] rounded-full border-[3px] border-[#60a5ef]"
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[20px] right-[10px]">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>

        {/* SHOP INFO */}

        <form
          aria-aria-required={true}
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop description</label>
            </div>
            <input
              type="name"
              placeholder={`${
                seller?.description
                  ? seller.description
                  : "Enter your shop description"
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
            />
          </div>
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="name"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="number"
              placeholder="Enter your Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Zip Code</label>
            </div>
            <input
              type="number"
              placeholder="Enter your zip code"
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
            />
          </div>

          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5 ">
            <input
              type="submit"
              value="Update Shop"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0  cursor-pointer`}
              required
              readOnly
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
