import Axios from "..";
export const getHotSearchWords = () => {
  return Axios.get("/api/search/hot/detail?timestamp=" + Date.now());
};
export const getSearchSuggests = (word) => {
  return Axios.get(
    "/api/search/suggest?keywords=" + word + "&timestamp=" + Date.now()
  );
};
