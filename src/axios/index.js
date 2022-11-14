import axios from "axios";
const Axios = axios.create({
  timeout: 4000,
  withCredentials: true,
});
Axios.interceptors.request.use((request) => {
  request.headers = {
    ...request.headers,
    authorization: "Bearer " + localStorage.getItem("token") || "",
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
  }
);
export default Axios;
