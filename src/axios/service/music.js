import Axios from "../index";
export const checkMusic = (id) => {
  return Axios.get("/api5/check/music?id=" + id);
};
export const getMusicUrl = (id) => {
  return Axios.get("/api5/song/url/v1?id=" + id + "&level=exhigh");
};
export const getMusicDetail = (id) => {
  return Axios.get("/api5/song/detail?ids=" + id);
};
export const getRecentSong = () => {
  return Axios.get("/api5/record/recent/song?timestamp=" + Date.now());
};
export const likeMusic = (id, like) => {
  return Axios.get(
    "/api5/like?id=" + id + "&like=" + like + "&timestamp=" + Date.now()
  );
};
export const getUserLikeMusics = (uid) => {
  return Axios.get("/api5/likelist?uid=" + uid + "&timestamp=" + Date.now());
};
export const downloadMusic = (id) => {
  return Axios.get("/api5/song/download/url?id=" + id);
};
export const getAlbumDetail = (id) => {
  return Axios.get("/api5/album?id=" + id);
};
export const getLyric = (id) => {
  return Axios.get("/api5/lyric?id=" + id);
};
