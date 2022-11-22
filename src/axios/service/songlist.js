import Axios from "../index";
export const getSongListTag = () => {
  return Axios.get("/api/playlist/catlist");
};
export const getImg = (cat, limit, before) => {
  //精品歌单 也是获取普通歌单封面
  if (before)
    return Axios.get(
      "/api/top/playlist/highquality?cat=" +
        cat +
        "&limit=" +
        limit +
        "&before=" +
        before
    );
  return Axios.get(
    "/api/top/playlist/highquality?cat=" + cat + "&limit=" + limit
  );
};
