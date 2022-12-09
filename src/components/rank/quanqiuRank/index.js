import React from "react";
import style from "./index.module.scss";
import { PlayCircleOutlined, CaretRightOutlined } from "@ant-design/icons";
import numberDeal from "../../../utils/playCount";
import { useNavigate } from "react-router-dom";
export default function QuanqiuRank(props) {
  const navigate = useNavigate();
  return (
    <div
      className={style.main}
      onClick={() => {
        navigate("/playlist?id=" + props.id);
      }}
    >
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
            left: "50%",
            top: "50%",
            fontSize: "50px",
            color: "#fff",
            opacity: 0,
          }}
        ></PlayCircleOutlined>
        <img className={style.img} src={props.img}></img>
      </div>
      <div className={style.text}>{props.name}</div>
    </div>
  );
}
