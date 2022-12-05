export default function userInfo(
  init = {
    name: "未登录",
    avatar:
      "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668333498132",
    vip: 0,
    isLogin: false,
    userId: 0,
  },
  { type, data }
) {
  switch (type) {
    case "setUserInfo":
      init = data;
      break;
    default:
      break;
  }
  return init;
}
