import React from "react";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
export default function HotWord(props) {
  const navigate = useNavigate();
  return (
    <div
      className={style.main}
      onClick={() => {
        navigate("/searchPage/song?words=" + props.word);
      }}
    >
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
