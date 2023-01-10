import Axios from "../index";
export const getRank = () => {
  return Axios.get("/api5/toplist");
};
export const getRankList = (id) => {
  //获取排行榜歌曲
  return Axios.get("/api5/playlist/detail?id=" + id);
};
export const getRankDetail = (id) => {
  return Axios.get(
    "/api5/playlist/detail?id=" + id + "&timestamp=" + Date.now()
  );
};
