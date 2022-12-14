import Axios from "..";
export const getHotSearchWords = () => {
  return Axios.get("/api5/search/hot/detail?timestamp=" + Date.now());
};
export const getSearchSuggests = (word) => {
  return Axios.get(
    "/api5/search/suggest?keywords=" + word + "&timestamp=" + Date.now()
  );
};
export const searchWords = (word, page, limit, type) => {
  return Axios.get(
    "/api5/cloudsearch?keywords=" +
      word +
      "&limit=" +
      limit +
      "&type=" +
      type +
      "&offset=" +
      (page - 1) * limit +
      "&timestamp=" +
      Date.now()
  );
};
