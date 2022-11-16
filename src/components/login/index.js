import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import {
  CloseOutlined,
  MobileOutlined,
  LockFilled,
  UnlockFilled,
} from "@ant-design/icons";
import { checkQr, getUserInfo } from "../../axios/service/login";
import { message, Input, Space } from "antd";
let interval = null; //useEffect定时器
export default function Login(props) {
  const [qrState, setState] = useState(801); //801代表待扫码 802为待确认 803为登陆成功 800为过期
  const [page, changePage] = useState(0); //0代码是扫码页面 1代表是手机号登录页面
  const [type, setType] = useState(1); //0代表扫码登陆 1代表密码 2代表验证码 (这个是表单登录页面 所以一般不用0)
  const [loginForm, setForm] = useState({
    phoneNumber: "",
    password: "",
    captcha: "",
  });
  useEffect(() => {
    if (props.display === false || page === 1) return clearInterval(interval);
    if (props.display === true) {
      interval = setInterval(async () => {
        const {
          data: { code, cookie },
        } = await checkQr(props.qrkey);
        setState(code);
        if (code == 803) {
          props.closeBox();
          localStorage.setItem("cookie", cookie);
          const {
            data: {
              profile: { nickname: name, avatarUrl: avatar },
            },
          } = await getUserInfo();
          props.sendUserInfo({ name, avatar });
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
              <Input
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
              />
              <div className={style.changeTypeText}>
                <div
                  style={{
                    cursor: "pointer",
                    display: type === 1 ? "block" : "none",
                  }}
                  onClick={() => {
                    setType(2);
                  }}
                >
                  验证码登录
                </div>
                <div
                  style={{
                    cursor: "pointer",
                    display: type === 2 ? "block" : "none",
                  }}
                  onClick={() => {
                    setType(1);
                  }}
                >
                  密码登录
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
