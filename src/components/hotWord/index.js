import React from "react";
import style from "./index.module.scss";
export default function HotWord(props) {
  return (
    <div className={style.main}>
      <div
        className={style.xuhao}
        style={{ color: props.index <= 3 ? "#fc5555" : "#cfcfcf" }}
      >
        {props.index}
      </div>
      <div className={style.content}>
        <div className={style.line1}>
          <div className={style.word}>{props.word}</div>
          <div className={style.icons}>
            <div
              style={{
                backgroundImage: `url(${props.iconUrl})`,
                display: props.iconUrl === "" ? "none" : "block",
              }}
              className={style.icon}
            ></div>
            <div style={{ color: "#cccccc", marginLeft: "5px" }}>
              {props.score}
            </div>
          </div>
        </div>
        <div className={style.line2}>{props.content}</div>
      </div>
    </div>
  );
}
