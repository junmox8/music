import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import {
  CloseOutlined,
  MobileOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import {
  checkQr,
  getUserInfo,
  loginByPassword,
  sentCaptcha,
  loginByCaptcha,
} from "../../axios/service/login";
import { message, Input, Spin } from "antd";
import { connect } from "react-redux";
let interval = null; //useEffect定时器
let time = null; //登录节流
const reg_tel =
  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/; //手机号正则表达式
function Login(props) {
  const [qrState, setState] = useState(801); //801代表待扫码 802为待确认 803为登陆成功 800为过期
  const [page, changePage] = useState(0); //0代码是扫码页面 1代表是手机号登录页面
  const [type, setType] = useState(1); //0代表扫码登陆 1代表密码 2代表验证码 (这个是表单登录页面 所以一般不用0)
  const [sendCaptcha, setCaptcha] = useState(true); //true代表可以发送验证码 false代表还在冷却
  const [waitSecond, setSecond] = useState(60); //发送验证码冷却时间
  const [loading, setLoading] = useState(false); //掌控spin的显示
  const [loginForm, setForm] = useState({
    phoneNumber: "",
    password: "",
    captcha: "",
  });
  useEffect(() => {
    if (props.display === false || page === 1) return clearInterval(interval);
    if (props.display === true) {
      interval = setInterval(async () => {
        const result = await checkQr(props.qrkey);
        console.log(result);
        const {
          data: { code, cookie },
        } = result;
        setState(code);
        if (code == 803) {
          localStorage.setItem("cookie", cookie);
          props.closeBox();
          const result = await getUserInfo();
          const {
            data: {
              profile: { nickname: name, avatarUrl: avatar, vipType, userId },
            },
          } = result;
          props.setUserInfo({
            name,
            avatar,
            vip: vipType,
            isLogin: true,
            userId,
          });
          message.success("登陆成功");
        }
      }, 2000);
    }
  }, [props.display, page]);
  const changeFormInput = (e, key) => {
    switch (key) {
      case "phoneNumber":
        setForm({
          ...loginForm,
          phoneNumber: e.target.value,
        });
        break;
      case "password":
        setForm({
          ...loginForm,
          password: e.target.value,
        });
        break;
      case "captcha":
        setForm({
          ...loginForm,
          captcha: e.target.value,
        });
        break;
    }
  };
  const sendCaptchaFun = async () => {
    if (!loginForm.phoneNumber) return message.error("请填写手机号");
    if (!reg_tel.test(loginForm.phoneNumber))
      return message.error("请注意手机号格式");
    setCaptcha(false);
    let i = 0;
    let time = null;
    time = setInterval(() => {
      if (i >= 59) {
        clearInterval(time);
        setSecond(60);
        setCaptcha(true);
      }
      setSecond((second) => second - 1); //在循环中使用useState 回调处理异步问题
      i++;
    }, 1000);
    const result = await sentCaptcha(loginForm.phoneNumber);
    if (result.data.code === 200) message.success("验证码发送成功");
    else message.error("发送失败,请稍后再试");
  };
  async function login() {
    if (!time) {
      time = setTimeout(() => {
        clearTimeout(time);
        time = null;
      }, 2000);

      if (
        ((!loginForm.phoneNumber || !loginForm.password) && type === 1) ||
        ((!loginForm.phoneNumber || !loginForm.captcha) && type === 2)
      )
        return message.error("请填写完整信息");
      if (!reg_tel.test(loginForm.phoneNumber))
        return message.error("请注意手机号格式");
      setLoading(true);
      try {
        let result;
        if (type === 1) {
          result = await loginByPassword(
            loginForm.phoneNumber,
            loginForm.password
          );
        }
        if (type === 2) {
          result = await loginByCaptcha(
            loginForm.phoneNumber,
            loginForm.captcha
          );
        }
        if (result && result.data && result.data.code == 200) {
          const {
            data: {
              profile: { nickname: name, avatarUrl: avatar, vipType, userId },
              cookie,
            },
          } = result;
          props.closeBox();
          localStorage.setItem("cookie", cookie);
          setForm({
            phoneNumber: "",
            password: "",
            captcha: "",
          });
          props.setUserInfo({
            name,
            avatar,
            vip: vipType,
            isLogin: true,
            userId,
          });
          message.success("登陆成功");
        }
        if (result && result.data && result.data.code !== 200)
          message.error(result.data.message);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    } else {
      message.error("请求太频繁,请稍后再试");
    }
  }
  return (
    <div
      className={style.loginBox}
      style={{ visibility: props.display === true ? "visible" : "hidden" }}
    >
      <div className={style.box}>
        <div
          className={style.loginByQR}
          style={{ display: page === 0 ? "block" : "none" }}
        >
          <div>
            <CloseOutlined
              style={{
                fontSize: "24px",
                marginLeft: "92%",
                cursor: "pointer",
                color: "#ABABAB",
              }}
              onClick={props.closeBox}
            />
          </div>
          <div className={style.text}>扫码登陆</div>
          <div className={style.imgLine}>
            <img src={props.qrimg}></img>
          </div>
          <div className={style.text2}>
            使用
            <a
              href="https://music.163.com/"
              style={{ color: "#0C73C2", fontSize: "18px", cursor: "pointer" }}
            >
              网易云音乐APP
            </a>
            扫码登录
          </div>
          <div
            style={{
              fontSize: "13px",
              marginTop: "20%",
              color: "#666666",
              cursor: "pointer",
            }}
            className={style.text2}
            onClick={() => {
              changePage(1);
            }}
          >
            选择其他登陆模式&gt;
          </div>
        </div>
        <div
          className={style.loginByPassword}
          style={{ display: page === 1 ? "block" : "none" }}
        >
          <div
            style={{ display: loading === true ? "block" : "none" }}
            className={style.spinBox}
          >
            <Spin></Spin>
          </div>
          <img
            onClick={() => {
              changePage(0);
            }}
            className={style.changePageQr}
            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668522864189"
          ></img>
          <img src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668522977621"></img>
          <CloseOutlined
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: "#ABABAB",
              position: "absolute",
              top: 0,
              right: "3px",
            }}
            onClick={props.closeBox}
          />
          <div className={style.logoBox}>
            <img src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668578846593"></img>
          </div>
          <div className={style.loginFormBox}>
            <div style={{ height: "100%", width: "80%" }}>
              <Input
                onChange={(e) => changeFormInput(e, "phoneNumber")}
                value={loginForm.phoneNumber}
                placeholder="请输入手机号"
                addonBefore={
                  <div>
                    <MobileOutlined /> +86
                  </div>
                }
              />
              <Input.Password
                style={{ display: type === 1 ? "block" : "none" }}
                onChange={(e) => changeFormInput(e, "password")}
                value={loginForm.password}
                placeholder="请输入密码"
                addonBefore={
                  <div>
                    <LockFilled />
                  </div>
                }
              />
              <Input
                style={{ display: type === 2 ? "block" : "none" }}
                onChange={(e) => changeFormInput(e, "captcha")}
                value={loginForm.captcha}
                placeholder="请输入验证码"
                addonBefore={
                  <div>
                    <UnlockFilled />
                  </div>
                }
                addonAfter={
                  <div>
                    <div
                      className={style.text1}
                      style={{
                        display: sendCaptcha === true ? "block" : "none",
                      }}
                      onClick={sendCaptchaFun}
                    >
                      获取验证码
                    </div>
                    <div
                      className={style.text2}
                      style={{
                        display: sendCaptcha === false ? "block" : "none",
                      }}
                    >
                      00:
                      <span
                        style={{
                          display: waitSecond < 10 ? "inline-block" : "none",
                        }}
                      >
                        0
                      </span>
                      {waitSecond}
                    </div>
                  </div>
                }
              />
              <div className={style.changeTypeText}>
                <div
                  style={{
                    cursor: "pointer",
                    display: type === 1 ? "block" : "none",
                    position: "absolute",
                    right: "0",
                  }}
                  onClick={() => {
                    setType(2);
                  }}
                >
                  <span>验证码登录</span>
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    display: type === 2 ? "block" : "none",
                    position: "absolute",
                    right: "0",
                  }}
                  onClick={() => {
                    setType(1);
                  }}
                >
                  <span>密码登录</span>
                </div>
              </div>
              <div
                style={{
                  marginTop: "25%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div className={style.loginButton} onClick={login}>
                  登录
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const a = null;
const b = (dispatch) => {
  return {
    setUserInfo: (value) =>
      dispatch({
        type: "setUserInfo",
        data: value,
      }),
  };
};
export default connect(a, b)(Login);
