import { userActionTypes } from "../constants/userAction.types";
import { apiCall } from "../../axios/index";
import { endpoint } from "../../axios/endpoints";
import { getCookie, setCookie } from "../../helper/cookies";

const userActionGenerator = (actionTypes, payload = {}) => {
  switch (actionTypes) {
    case userActionTypes.ADD:
      return async (dispatch) => {
        try {
          const { data } = await apiCall({
            url: endpoint.login,
            body: { ...payload },
            method: "POST",
          });

          setCookie("Token", data.token, {
            path: "/",
            expires: new Date(Date.now() + 86400e3 * 2),
          });
          dispatch({
            type: userActionTypes.ADD,
            payload: { user: { ...data.user } },
          });
        } catch (err) {
          dispatch({
            type: userActionTypes.ERROR,
            payload: {
              ...payload,
              message: "Something went wrong please Try Again..!!",
              status: "error",
            },
          });
        }
      };

    case userActionTypes.GET:
      return (dispatch) => {
        apiCall({
          url: endpoint.userDetails,
          method: "GET",
          headers: { Authorization: `Bearer ${getCookie("Token")}` },
        })
          .then((response) => {
            dispatch({
              type: userActionTypes.GET,
              payload: {
                user: { ...response.data.user },
              },
            });
          })
          .catch((err) => {
            dispatch({
              type: userActionTypes.GET,
              payload: {
                ...payload,
              },
            });
          });
      };

    case userActionTypes.ERROR:
      return {
        type: userActionTypes.ERROR,
        payload: { ...payload },
      };

    default:
      return {
        type: "Invalid",
      };
  }
};

export default userActionGenerator;
