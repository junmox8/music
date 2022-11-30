export default function loginType(init = false, { type, data }) {
  switch (type) {
    case "setLoginType":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
