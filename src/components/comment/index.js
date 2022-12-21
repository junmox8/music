import React from "react";
import style from "./index.module.scss";
export default function Comment(props) {
  return (
    <div className={style.main}>
      <div className={style.avatarContent}>
        <div
          style={{ backgroundImage: `url(${props.avatarUrl})` }}
          className={style.avatar}
        >
          <div className={style.icon1}>
            <img style={{ width: "15px" }} src={props.bottomIcon}></img>
          </div>
        </div>
      </div>
      <div className={style.textContent}>
        <div className={style.line1}>
          <div className={style.name}>{props.userName}</div>
          <img
            className={style.icon2}
            style={{
              width: "45px",
              marginLeft: "5px",
              display: props.rightIcon ? "block" : "none",
            }}
            src={props.rightIcon}
          ></img>
        </div>
        <div className={style.line2}>
          <div className={style.text}>{props.content}</div>
        </div>
        <div
          className={style.line3}
          style={{
            display:
              props.replyContent && props.replyContent.length > 0
                ? "block"
                : "none",
          }}
        >
          <span className={style.username}>
            @{props.replyUsername}:&nbsp;&nbsp;
          </span>
          <span className={style.content}>@{props.replyContent}:</span>
        </div>
        <div className={style.lin4}>
          <div className={style.time}>{props.time}</div>
        </div>
      </div>
    </div>
  );
}
