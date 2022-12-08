import Axios from "../index";
export const checkMusic = (id) => {
  return Axios.get("/api/check/music?id=" + id);
};
export const getMusicUrl = (id) => {
  return Axios.get("/api/song/url/v1?id=" + id + "&level=exhigh");
};
export const getMusicDetail = (id) => {
  return Axios.get("/api/song/detail?ids=" + id);
};
export const getRecentSong = () => {
  return Axios.get("/api/record/recent/song?timestamp=" + Date.now());
};
export const likeMusic = (id, like) => {
  return Axios.get(
    "/api/like?id=" + id + "&like=" + like + "&timestamp=" + Date.now()
  );
};
export const getUserLikeMusics = (uid) => {
  return Axios.get("/api/likelist?uid=" + uid + "&timestamp=" + Date.now());
};
export const downloadMusic = (id) => {
  return Axios.get("/api/song/download/url?id=" + id);
};
export const getAlbumDetail = (id) => {
  return Axios.get("/api/album?id=" + id);
};
