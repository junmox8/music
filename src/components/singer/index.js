import React from "react";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
export default function SingerList(props) {
  const navigate = useNavigate();
  return (
    <div
      className={style.main}
      onClick={() => navigate("/singer?id=" + props.id)}
    >
      <div className={style.imgContain}>
        <img className={style.img} src={props.img}></img>
      </div>
      <div className={style.text}>{props.name}</div>
    </div>
  );
}
