import Axios from "../index";

export const loginByQr = () => {
  return Axios.get("/api/login/qr/key?timestamp=" + Date.now());
};
export const createQr = (key) => {
  return Axios.get(
    "/api/login/qr/create?key=" +
      key +
      "&qrimg=" +
      1 +
      "&timestamp=" +
      Date.now()
  );
};
export const checkQr = (key) => {
  return Axios.get(
    "/api/login/qr/check?key=" + key + "&timestamp=" + Date.now()
  );
};
export const getUserInfo = () => {
  return Axios.get("/api/user/account");
};
export const loginByPassword = (phoneNumber, password) => {
  return Axios.get(
    "/api/login/cellphone?phone=" +
      phoneNumber +
      "&password=" +
      password +
      "&timestamp=" +
      Date.now()
  );
};
