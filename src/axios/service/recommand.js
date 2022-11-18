import Axios from "../index";
export const getBanner = () => {
  return Axios.get("/api/banner");
};
export const getSongList = () => {
  return Axios.get("/api/recommend/resource");
};
