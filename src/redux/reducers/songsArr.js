export default function setSongsArr(init = [], action) {
  const { type, data } = action;
  switch (type) {
    case "setSongsArr":
      init = data;
      break;
    case "addSongToArr":
      init.unshift(data);
      break;
    default:
      break;
  }
  return init;
}
