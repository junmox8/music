export default function setSongsArr(
  init = [{ name: "", singer: "", time: "", id: 0 }],
  action
) {
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
