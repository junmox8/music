import axios from "axios";
const Axios = axios.create({
  timeout: 4000,
});
// Axios.interceptors.request.use((req) => {});
export default Axios;
