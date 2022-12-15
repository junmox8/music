export default function musicPlaying(init = {}, action) {
  const { type, data } = action;
  switch (type) {
    case "setPlayingMusic":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
