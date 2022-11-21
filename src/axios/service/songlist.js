import Axios from "../index";
export const getSongListTag = () => {
  return Axios.get("/api/playlist/catlist");
};
