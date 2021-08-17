import axios from "axios";
import { isLoaded, isEmpty } from "react-redux-firebase";
import * as API_CONSTANTS from "./index.js";
import { getCurrentUserIdToken } from "../services/authentication.js";

import store from "../redux/index.js";

import { createGuestUser } from "../services/authentication.js";

//Build Two
//Add to Cart function
export const addToCart = async (productId, variant) => {
  if (isLoaded(store.getState().firebase.auth)) {
    if (isEmpty(store.getState().firebase.auth)) {
      //Create Guest Account
      // await createGuestUser();
    }
    var getTokenResult = await getCurrentUserIdToken();

    if (getTokenResult.ok === true) {
      console.log(getTokenResult.data);
      const config = {
        headers: {
          credentialclaims: "customer",
          Authorization: "Bearer " + getTokenResult.data,
        },
      };

      return axios
        .post(
          API_CONSTANTS.CART_ROUTE + "/cart_item",
          { product_id: productId, variant: variant },
          config
        )
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return { ok: false, error: error };
        });
    } else {
      //Failed to get Token
      return getTokenResult;
    }
    // Add to Cart Logic
  } else {
    return { ok: false, message: "Add to Cart Failed - Try again" };
  }
};

export const getCart = async () => {
  if (isLoaded(store.getState().firebase.auth)) {
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      if (getTokenResult.ok === true) {
        const config = {
          headers: {
            credentialclaims: "customer",
            Authorization: "Bearer " + getTokenResult.data,
          },
        };
        return axios
          .get(API_CONSTANTS.CART_ROUTE, config)
          .then((res) => {
            // Request Succesfull
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          })
          .catch((error) => {
            //Request Unsuccesfull
            return { ok: false, error: error };
          });
      } else {
        //Failed to get Token
        return getTokenResult;
      }
    } else {
      return { ok: false, message: "No User Signed In" };
    }
    // Add to Cart Logic
  } else {
    return { ok: false, message: "Getting Cart Failed - Try again" };
  }
};

export const updateCartItemQuantity = async (
  product_id,
  option,
  newQuantity
) => {
  if (isLoaded(store.getState().firebase.auth)) {
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      if (getTokenResult.ok === true) {
        const config = {
          headers: {
            credentialclaims: "customer",
            Authorization: "Bearer " + getTokenResult.data,
          },
        };
        return axios
          .patch(
            API_CONSTANTS.CART_ROUTE + "/cart_item",
            { product_id: product_id, option: option, newQuantity },
            config
          )
          .then((res) => {
            // Request Succesfull
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          })
          .catch((error) => {
            //Request Unsuccesfull
            return { ok: false, error: error };
          });
      } else {
        //Failed to get Token
        return getTokenResult;
      }
    } else {
      return { ok: false, message: "No User Signed In" };
    }
    // Add to Cart Logic
  } else {
    return { ok: false, message: "Updating a Cart Item Failed - Try again" };
  }
};

export const deleteSingleCartItem = async (product_id, option) => {
  if (isLoaded(store.getState().firebase.auth)) {
    if (!isEmpty(store.getState().firebase.auth)) {
      var getTokenResult = await getCurrentUserIdToken();

      if (getTokenResult.ok === true) {
        const config = {
          headers: {
            credentialclaims: "customer",
            Authorization: "Bearer " + getTokenResult.data,
          },
          data: {
            product_id: product_id,
            option: option,
          },
        };
        return axios
          .delete(API_CONSTANTS.CART_ROUTE + "/cart_item", config)
          .then((res) => {
            // Request Succesfull
            //Handle Different HTTP Status Codes and Responses
            return res.data;
          })
          .catch((error) => {
            //Request Unsuccesfull
            return { ok: false, error: error };
          });
      } else {
        //Failed to get Token
        return getTokenResult;
      }
    } else {
      return { ok: false, message: "No User Signed In" };
    }
    // Add to Cart Logic
  } else {
    return { ok: false, message: "Deleting a Cart Item Failed - Try again" };
  }
};
