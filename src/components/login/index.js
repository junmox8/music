import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { CloseOutlined } from "@ant-design/icons";
import { checkQr } from "../../axios/service/login";
export default function Login(props) {
  useEffect(() => {
    const interval = setInterval(async () => {
      if (props.display === true) {
        const result = await checkQr(props.qrkey);
        console.log(result);
      } else clearInterval(interval);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [props.display]);
  const [qrState, setState] = useState(0); //0代表待扫码 1为待确认 2为登陆成功 3为过期
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
        </div>
        <div className={style.loginByPassword}></div>
      </div>
    </div>
  );
}
