import axios from "axios";
import { getCurrentUserIdToken } from "../services/authentication.js";
import * as API_CONSTANTS from "./index.js";

//Used to add address to a user's account when button is clicked
export const createNewShippingAddress = async (
  addressName,
  firstName,
  lastName,
  addressLineOne,
  addressLineTwo,
  city,
  province,
  country,
  zipCode,
  contactNumber,
  deliveryInstruction
) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialclaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
    };

    // post creates a new address
    return axios
      .post(
        API_CONSTANTS.SHIPPING_ROUTE,
        {
          addressName,
          firstName,
          lastName,
          addressLineOne,
          addressLineTwo,
          city,
          province,
          country,
          zipCode,
          contactNumber,
          deliveryInstruction
        },
        config
      )
      .then((res) => {
        // Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // returns the corresponding details for a signed in user
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's details
        return { ok: false, message: "Network Error: Please Check your internet connection." };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};

export const getShippingAddressById = async (addressId) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialClaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
      params: {
        addressId: addressId,
      },
    };
    return axios
      .get(API_CONSTANTS.SHIPPING_ROUTE + "/address", config)
      .then((res) => {
        //Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // Returns the corresponding Shipping address.
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's shipping address
        return { ok: false, error: error };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};

export const deleteShippingAddress = async (address_id) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialclaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
      data: {
        //sets the product id and option values of the item being deleted
        addressId: address_id,
      },
    };
    return axios
      .delete(API_CONSTANTS.SHIPPING_ROUTE + "/address", config)
      .then((res) => {
        // Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // returns the corresponding details for a signed in user
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's details
        return { ok: false, message: "Network Error: Please Check your internet connection." };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};

export const getShippingAddresses = async () => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialClaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
    };
    return axios
      .get(API_CONSTANTS.SHIPPING_ROUTE, config)
      .then((res) => {
        //Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // Returns the corresponding Shipping address.
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's shipping address
        return { ok: false, message: "Network Error: Please Check your internet connection." };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};

export const updateShippingAddressById = async (addressId, addressData) => {
  var getTokenResult = await getCurrentUserIdToken();

  // checks whether the current user's token was retrieved successfully
  if (getTokenResult.ok === true) {
    // sets the necessary header information for authentication based on the user's token
    const config = {
      headers: {
        credentialClaims: "customer",
        Authorization: "Bearer " + getTokenResult.data,
      },
    };
    return axios
      .put(
        API_CONSTANTS.SHIPPING_ROUTE + "/address",
        { addressId: addressId, addressData: addressData },
        config
      )
      .then((res) => {
        //Request Successful
        //Handle Different HTTP Status Codes and Responses
        return res.data; // Returns the corresponding Shipping address.
      })
      .catch((error) => {
        // returns general error when the system fails to retrieve a user's shipping address
        return { ok: false, message: "Network Error: Please Check your internet connection." };
      });
  } else {
    //returns a general error when the system has failed to get the user's token
    return getTokenResult;
  }
};
