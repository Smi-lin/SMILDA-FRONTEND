import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { MdTrackChanges } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import { getUser, updateUser } from "../../redux/features/auth/AuthSlice";
import { getAllOrdersOfUser } from "../../redux/orderSlice";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.authReducer);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phone);
  const [bio, setBio] = useState(user && user.bio);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(email, password, phoneNumber, name, bio));
  };

  return (
    <div className="w-full">
      {/* PROFILE PAGE */}

      {active === 1 ? (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS382U5o94IKdvwFejI36JywVe7YTuELul4Uw&usqp=CAU"
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
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
                    value={name} //
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
                  <label className="block pb-2">Enter Your Password</label>
                  <input
                    type="password"
                    className={`${styles.input} !w-[80%] mb-4 800px:mb-0`}
                    required
                    value={password} //user.name
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3 ml-[5%]">
                <div className="w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Bio</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[80%] mb-4 800px:mb-0`}
                    required
                    value={bio} //user.name
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>
              </div>
              <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer ml-6`}
                required
                value="Update"
                type="submit"
              />
            </form>
          </div>
        </>
      ) : null}

      {/* ORDER PAGE */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* REFUNDS PAGE */}
      {active === 3 && (
        <div>
          <AllRefundsOrders />
        </div>
      )}

      {/* TRACK ORDER PAGE */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* PAYMENT METHOD PAGE */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { orders } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemQty: item.cart.length,
        total: "NGN₦" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1 mr-[5%] ml-[5%]">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundsOrders = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { orders } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1 mr-[5%] ml-[5%]">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { orders } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1 ">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/changePassword`,
        { oldPassword, newPassword, confirmPassword },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Password change successful, please re-login");
        setNewPassword("");
        setOldPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2 pl-9">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};


export default ProfileContent;


