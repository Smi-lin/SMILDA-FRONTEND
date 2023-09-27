import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { loadSeller } from "../../redux/actions/seller";
import axios from "axios";
import { pass } from "../../server";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { seller } = useSelector((state) => state.sellerSlice);
  const [name, setName] = useState(seller && seller.name);
  const [email, setEmail] = useState(seller && seller.email);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [address, setAddress] = useState(seller && seller.address);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(loadSeller());
  }, [dispatch]);

  // const logoutHandler = async () => {
  //   axios
  //     .get(`${pass}/logout`, {
  //       withCredentials: false,
  //     })
  //     .then((res) => {
  //       toast.success("Logout Success!");
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //     });
  // };

  return (
    <div className="w-full mb-[15rem]">
      <>
        <div className="flex justify-center w-[80vw]">
          <div className="relative">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS382U5o94IKdvwFejI36JywVe7YTuELul4Uw&usqp=CAU"
              className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#7593cf]"
              alt=""
            />
          </div>
        </div>
        <br />
        <br />

        <div className="w-full px-5">
          <form onSubmit={handleSubmit} aria-required={true}>
            <div className="w-full 800px:flex block pb-3 ml-[5%]">
              <div className="w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Full Name</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[80%] mb-4 800px:mb-0`}
                  required
                  value={seller?.name} //
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {/* part 2 */}
              <div className="w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Email Address</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[80%] mb-4 800px:mb-0`}
                  required
                  value={email} //user.name
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* SECTION 2 */}
            <div className="w-full 800px:flex block pb-3 ml-[5%]">
              <div className="w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Phone Number</label>
                <input
                  type="number"
                  className={`${styles.input} !w-[80%] mb-4 800px:mb-0`}
                  required
                  value={phoneNumber} //user.name
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="w-[100%] 800px:w-[50%]">
                <label className="block pb-2">Address</label>
                <input
                  type="text"
                  className={`${styles.input} !w-[80%] mb-4 800px:mb-0`}
                  required
                  value={address} //user.name
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
             
            </div>
           
          </form>
          {/* <div
                className={`${styles.button} w-[10vw] !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div> */}
        </div>
      </>
    </div>
  );
};

export default ProfileData;
