import axios from "axios";
import { pass } from "../../server";

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