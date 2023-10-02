import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loguout } from "../../redux/features/auth/AuthSlice";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate(true);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios
      .get(`${server}/logout`, { withCredentials: true })
      .then(() => {
        toast.success("Logout Successful");
        dispatch(loguout());
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 ml-9">
      {/* SECTION 1 */}
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>

      {/* SECTION 2 */}
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>

      {/* SECTION 3 */}
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      {/* SECTION 5 */}
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Track Orders
        </span>
      </div>

      {/* SECTION 6 */}
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      {/* SECTION 8 */}
      <div
        className="flex items-center cursor-pointer w-full mb-8 "
        onClick={() => setActive(7) || logoutHandler(true)}
      >
        <AiOutlineLogin size={20} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log Out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
