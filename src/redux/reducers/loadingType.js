export default function loadingType(init = 1, { type, data }) {
  //1为收藏歌手
  switch (type) {
    case "setLoadingType":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
