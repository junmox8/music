import React from "react";
import style from "./index.module.scss";
import { PlayCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import numberDeal from "../../utils/playCount";
export default function Songlist(props) {
  return (
    <div className={style.main}>
      <div className={style.imgContain}>
        <div className={style.countArea}>
          <CaretRightOutlined
            style={{ fontSize: "20px", color: "#fff" }}
          ></CaretRightOutlined>
          <div style={{ color: "#fff", display: "inline-block" }}>
            {numberDeal(props.playCount)}
          </div>
        </div>
        <PlayCircleOutlined
          className={style.icon}
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            fontSize: "28px",
            color: "#fff",
            transition: "all",
            transitionDuration: "1s",
            opacity: 0,
          }}
        ></PlayCircleOutlined>
        <img className={style.img} src={props.imgUrl}></img>
      </div>
      <div className={style.text}>{props.name}</div>
    </div>
  );
}
