import Axios from "../index";
export const checkMusic = (id) => {
  return Axios.get("/api/check/music?id=" + id);
};
export const getMusicUrl = (id) => {
  return Axios.get("/api/song/url/v1?id=" + id + "&level=exhigh");
};
