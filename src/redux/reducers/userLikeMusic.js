export default function userLikeMusic(init = [], actions) {
  const { type, data } = actions;
  switch (type) {
    case "setUserLikeMusic":
      init = data;
      break;
    case "addUserLikeMusic":
      init.push(data);
      break;
    default:
      break;
  }
  return init;
}
