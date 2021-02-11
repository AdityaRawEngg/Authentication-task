import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-ecomm-fed59.cloudfunctions.net/app",
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

export const apiCall = ({ url, body = {}, method = "POST", headers = {} }) => {
  switch (method) {
    case "POST":
      return new Promise(function (resolve, reject) {
        axiosInstance
          .post(url, body)
          .then((response) => {
            if (response.data.success) {
              resolve(response);
            }
            if (response.data.msg) {
              window.alert(response.data.msg);
            }
          })
          .catch((err) => reject(err));
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
            if (err.response.data.msg) {
              window.alert(err.response.data.msg);
            } else {
              window.alert(err.message);
            }
            reject(err);
          });
      });

    default:
      break;
  }
};

export default axiosInstance;
