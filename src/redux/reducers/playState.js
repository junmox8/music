export default function playState(init = true, { type, data }) {
  switch (type) {
    case "setPlayState":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
