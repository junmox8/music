import axios from "axios";
import { message } from "antd";
const Axios = axios.create({
  timeout: 19000,
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
    console.log(error);
    message.error(error.mesage ? error.message : "请稍后再试");
  }
);
export default Axios;
