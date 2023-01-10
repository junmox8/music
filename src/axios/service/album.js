import Axios from "..";
export const getAlbumDetail = (id) => {
  return Axios.get("/api5/album?id=" + id);
};
export const getAlbumConment = (id, offset) => {
  return Axios.get(
    "/api5/comment/album?id=" +
      id +
      "&timestamp=" +
      Date.now() +
      "&limit=" +
      50 +
      "&offset=" +
      (offset - 1) * 50
  );
};
