import Axios from "../index";
export const getBanner = () => {
  return Axios.get("/api/banner");
};
export const getSongList = () => {
  return Axios.get("/api/recommend/resource");
};
export const getNewestMusic = () => {
  return Axios.get("/api/personalized/newsong?limit=12");
};