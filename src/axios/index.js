import axios from "axios";
import { message } from "antd";
const Axios = axios.create({
  timeout: 4000,
  withCredentials: true,
});
Axios.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    "Set-Cookies": localStorage.getItem("cookie") || "",
    withCredentials: true,
  };
  return request;
});
Axios.interceptors.response.use(
  (responce) => {
    return responce;
  },
  (error) => {
    message.error(error.response.data.message);
  }
);
export default Axios;
