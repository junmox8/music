import React, { useEffect } from "react";
import style from "./index.module.scss";
import { PlayCircleFilled } from "@ant-design/icons";
export default function NewestSong(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <div className={style.main}>
      <div
        style={{
          height: "100%",
          width: "15%",
          position: "relative",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundImage: `url(${props.imgUrl})`,
          backgroundSize: "cover",
        }}
      >
        <PlayCircleFilled className={style.icon}></PlayCircleFilled>
      </div>
      <div className={style.texContain}>
        <div className={style.name}>
          <p className={style.singName}>{props.name}</p>
          <p
            style={{
              display: props.alias.length > 0 ? "inline-block" : "none",
            }}
            className={style.alias}
          >
            ({props.alias})
          </p>
        </div>
        <div className={style.lastContain}></div>
      </div>
    </div>
  );
}
