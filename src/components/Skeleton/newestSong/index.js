import React from "react";
import style from "./index.module.scss";
import { Skeleton } from "antd";
export default function NewestSongSkeleton() {
  return (
    <div className={style.main}>
      <Skeleton.Image
        style={{ height: "65px", width: `calc((100vw - 195px) * 0.8*0.05)` }}
        className={style.skeleton}
      />
      <Skeleton
        style={{ marginLeft: "5px", height: "50px" }}
        paragraph={{ rows: 1 }}
      ></Skeleton>
    </div>
  );
}
