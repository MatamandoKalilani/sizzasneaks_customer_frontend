import { getUserDetails } from "../../api/users.js";
import { getUserCart, clearUserCart } from "./cart.js";
//This function is used to get profile of a user once he logs in successfully

export const getUserProfile = () => async (dispatch) => {
  dispatch({
    type: "USER_PROFILE_LOADING",
  });

  //getUserDetailsResult Awaits getUserDetails
  var getUserDetailsResult = await getUserDetails();
  //if true this
  if (getUserDetailsResult.ok === true) {
    dispatch({
      type: "GET_USER_PROFILE",
      payload: { ...getUserDetailsResult.data, loading: false },
    });

  } else {
    dispatch({
      type: "GET_USER_PROFILE",
      payload: { ok: false, error: "Failed getting user credentials " },
    });
  }
};

export const clearUserProfile = () => {
  return {
    type: "ClEAR_USER_PROFILE",
  };
};
