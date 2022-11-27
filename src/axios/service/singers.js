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
