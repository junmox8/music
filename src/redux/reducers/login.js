export default function isLogin(init = false, action) {
  const { type, data } = action;
  switch (type) {
    case "isLogin":
      init = !init;
      break;
    default:
      break;
  }
  return init;
}
