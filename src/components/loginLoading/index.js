import React from "react";
import style from "./index.module.scss";
export default function Loading(props) {
  return (
    <div
      style={{ visibility: props.display === true ? "visible" : "hidden" }}
      className={style.main}
    >
      <img
        className={style.img}
        src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668413414494"
      ></img>
      <div className={style.text}>正在加载登录页,请稍等...</div>
    </div>
  );
}
