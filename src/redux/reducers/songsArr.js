export default function setSongsArr(
  init = [{ name: "", singer: "", time: "" }],
  action
) {
  const { type, data } = action;
  switch (type) {
    case "playSong":
      init = "data";
      break;
    case "addSongToArr":
      init.push(data);
      break;
    default:
      break;
  }
  return init;
}
