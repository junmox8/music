export default function loading(init = false, { type, data }) {
  switch (type) {
    case "setLoading":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
