import axios from "axios";
import { server } from "../../server";
import { pass } from "../../server";

// Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const data = await axios.get(`${server}/getUser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      // payload: error.response.data.message,
    });
  }
};

// Load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const data = await axios.get(`${pass}/getSeller`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      // payload: error.response.data.message,
    });
  }
};

// UPDATE USER INFO
export const updateUserInformation =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/updateUserInfo`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
        }
      );
      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

// UPDATE USER ADDRESS
export const updateUserAddress =
  (country, city, address1, address2, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserAddressRequest",
      });

      const { data } = await axios.put(
        `${server}/updateAddress`,
        {
          country,
          city,
          address1,
          address2,
          addressType,
        },
        {
          withCredentials: false,
        }
      );

      dispatch({
        type: "updateUserAddressSuccess",
        payload: {
          successMessage: "User address updated successfully",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "updateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };


  export const deleteUserAddress = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteUserAddressRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/deleteUserAddress/${id}`,
        { withCredentials: true }
      );
  
      dispatch({
        type: "deleteUserAddressSuccess",
        payload: {
          successMessage: "User deleted successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "deleteUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };
