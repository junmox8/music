import Axios from "../index";
export const getBanner = () => {
  return Axios.get("/api5/banner");
};
export const getSongList = () => {
  return Axios.get("/api5/personalized?limit=8");
};
export const getNewestMusic = () => {
  return Axios.get("/api5/personalized/newsong?limit=12");
};
