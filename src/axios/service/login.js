import Axios from "../index";

export const loginByQr = () => {
  return Axios.get("/api5/login/qr/key?timestamp=" + Date.now());
};
export const createQr = (key) => {
  return Axios.get(
    "/api5/login/qr/create?key=" +
      key +
      "&qrimg=" +
      1 +
      "&timestamp=" +
      Date.now()
  );
};
export const checkQr = (key) => {
  return Axios.get(
    "/api5/login/qr/check?key=" + key + "&timestamp=" + Date.now()
  );
};
export const getUserInfo = () => {
  return Axios.get("/api5/user/account");
};
export const loginByPassword = (phoneNumber, password) => {
  return Axios.get(
    "/api5/login/cellphone?phone=" +
      phoneNumber +
      "&password=" +
      password +
      "&timestamp=" +
      Date.now()
  );
};
export const sentCaptcha = (phoneNumber) => {
  return Axios.get(
    "/api5/captcha/sent?phone=" + phoneNumber + "&timestamp=" + Date.now()
  );
};
export const loginByCaptcha = (phoneNumber, captcha) => {
  return Axios.get(
    "/api5/login/cellphone?phone=" +
      phoneNumber +
      "&captcha=" +
      captcha +
      "&timestamp=" +
      Date.now()
  );
};
