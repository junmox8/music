import React from "react";
import style from "./index.module.scss";
export default function Song(props) {
  return <div className={style.main}>{props.name}</div>;
}
