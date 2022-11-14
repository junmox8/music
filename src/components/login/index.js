import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { checkQr, getUserInfo } from "../../axios/service/login";
import { message } from "antd";
let interval = null; //useEffect定时器
export default function Login(props) {
  const [qrState, setState] = useState(801); //801代表待扫码 802为待确认 803为登陆成功 800为过期
  useEffect(() => {
    if (props.display === false) return clearInterval(interval);
    if (props.display === true) {
      interval = setInterval(async () => {
        const {
          data: { code, cookie },
        } = await checkQr(props.qrkey);
        setState(code);
        if (code == 803) {
          props.closeBox();
          localStorage.setItem("cookie", cookie);
          const result = await getUserInfo();
          console.log(result);
          message.success("登陆成功");
        }
      }, 2000);
    }
  }, [props.display]);

  return (
    <div
      className={style.loginBox}
      style={{ visibility: props.display === true ? "visible" : "hidden" }}
    >
      <div className={style.box}>
        <div className={style.loginByQR}>
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
          >
            选择其他登陆模式&gt;
          </div>
        </div>
        <div className={style.loginByPassword}></div>
      </div>
    </div>
  );
}
