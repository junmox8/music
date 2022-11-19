export default function playSong(init = "", action) {
  const { type, data } = action;
  switch (type) {
    case "playSong":
      init = "data";
      break;
    default:
      break;
  }
  return init;
}
