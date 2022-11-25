import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { PlayCircleFilled } from "@ant-design/icons";
import { getRankList } from "../../axios/service/rank";
export default function RankComponent(props) {
  useEffect(() => {
    (async function () {
      const {
        data: {
          playlist: { tracks },
        },
      } = await getRankList(props.id);
      console.log(tracks);
    })();
  }, []);
  return (
    <div className={style.main}>
      <div className={style.imgContainer}>
        <img src={props.img}></img>
        <div className={style.text}>{props.time}</div>
        <div className={style.iconContainer}>
          <PlayCircleFilled
            style={{ color: "#ec4141", fontSize: "46px" }}
          ></PlayCircleFilled>
        </div>
      </div>
    </div>
  );
}
