import React from "react";
import style from "./songlist.module.scss";
import { Skeleton } from "antd";
export default function SonglistSkeleton() {
  return (
    <div className={style.main}>
      <Skeleton.Image
        style={{ height: "190px", width: `calc((100vw - 195px) * 0.8*0.22)` }}
        className={style.skeleton}
      />
      <Skeleton style={{ marginTop: "5px" }} paragraph={{ rows: 1 }}></Skeleton>
    </div>
  );
}
