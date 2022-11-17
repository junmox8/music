import Axios from "../index";
export const getBanner = () => {
  return Axios.get("/api/banner");
};
