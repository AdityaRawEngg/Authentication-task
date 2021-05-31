import axios from "axios";
import { removeCookie } from "../helper/cookies";
import store from "../redux/store/store";
import { userActionTypes } from "../redux/constants/userAction.types";
import userActionGenerator from "../redux/actions/userAction.generator";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-ecomm-fed59.cloudfunctions.net/app",
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 403) {
        removeCookie("Token");
      }
    }
    return Promise.reject(error);
  }
);

export const apiCall = ({ url, body = {}, method = "POST", headers = {} }) => {
  switch (method) {
    case "POST":
      return new Promise(function (resolve, reject) {
        axiosInstance
          .post(url, body)
          .then((response) => {
            if (response.data.success) {
              store.dispatch(
                userActionGenerator(userActionTypes.ERROR, {
                  status: "Success",
                  message: "Success",
                })
              );
              resolve(response);
            }
            if (response.data.msg) {
              store.dispatch(
                userActionGenerator(userActionTypes.ERROR, {
                  status: "Info",
                  message: response.data.msg,
                })
              );
            }
          })
          .catch((err) => {
            if (err.response) {
              if (err.response.status === 403) {
                removeCookie("Token");
                store.dispatch(
                  userActionGenerator(userActionTypes.ERROR, {
                    status: "Error",
                    message: err.response.data.msg,
                  })
                );
              }
            } else {
              store.dispatch(
                userActionGenerator(userActionTypes.ERROR, {
                  status: "Error",
                  message: err.message,
                })
              );
            }
            reject(err);
          });
      });
    case "GET":
      return new Promise(function (resolve, reject) {
        axiosInstance
          .get(url, { headers: { ...headers } })
          .then((response) => {
            if (response.status === 200) {
              if (response.data.success) {
                resolve(response);
              }
            }
          })
          .catch((err) => {
            if (err.response.status === 403) {
              removeCookie("Token");
              store.dispatch(
                userActionGenerator(userActionTypes.ERROR, {
                  status: "Error",
                  message: err.response.data.msg,
                })
              );
            } else {
              store.dispatch(
                userActionGenerator(userActionTypes.ERROR, {
                  status: "Error",
                  message: err.message,
                })
              );
            }
            reject(err);
          });
      });

    default:
      break;
  }
};

export default axiosInstance;
