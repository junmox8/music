import React from "react";
import style from "./index.module.scss";
import { Skeleton } from "antd";
export default function SonglistSkeleton2(props) {
  return (
    <div style={{ display: props.display }} className={style.main}>
      <Skeleton.Image
        style={{ height: "190px", width: `calc((100vw - 195px) * 0.8*0.18)` }}
        className={style.skeleton}
      />
      <Skeleton style={{ marginTop: "5px" }} paragraph={{ rows: 1 }}></Skeleton>
    </div>
  );
}
