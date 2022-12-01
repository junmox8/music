import Axios from "../index";
export const getSingerList = (page, initial, area, type) => {
  //获取歌手列表
  if (initial === "热门")
    return Axios.get(
      "/api/artist/list?offset=" +
        (page - 1) * 30 +
        "&type=" +
        type +
        "&area=" +
        area +
        "&timestamp=" +
        Date.now()
    );
  return Axios.get(
    "/api/artist/list?offset=" +
      (page - 1) * 30 +
      "&type=" +
      type +
      "&area=" +
      area +
      "&initial=" +
      initial +
      "&timestamp=" +
      Date.now()
  );
};
export const getSingerDesc = (id) => {
  return Axios.get("/api/artist/desc?id=" + id);
};
export const getSingerDetail = (id) => {
  return Axios.get("/api/artist/detail?id=" + id);
};
export const findOutUserCollection = () => {
  return Axios.get("/api/artist/sublist?timestamp=" + Date.now());
};
export const collectSingerOrNot = (id, t) => {
  //1为收藏 其他为取消收藏
  return Axios.get("/api/artist/sub?id=" + id + "&t=" + t);
};
export const getSingerAlbum = (id, offset) => {
  return Axios.get(
    "/api/artist/album?id=" + id + "&limit=5" + "&offset=" + (offset - 1) * 5
  );
};
