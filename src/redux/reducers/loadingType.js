export default function loadingType(init = 1, { type, data }) {
  //1为收藏歌手
  switch (type) {
    case "setLoading":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
