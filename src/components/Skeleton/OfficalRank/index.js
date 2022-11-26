import React, { forwardRef } from "react";
import style from "./index.module.scss";
import { Skeleton } from "antd";
function OfficalRank(props, ref) {
  return (
    <div ref={ref} style={{ display: props.display }} className={style.main}>
      <div>
        <Skeleton.Image
          style={{ height: "190px", width: `calc((100vw - 195px) * 0.8*0.18)` }}
          className={style.skeleton}
        />
      </div>
      <div style={{ width: "100%" }}>
        <Skeleton
          style={{ width: "100%", marginLeft: "20px" }}
          paragraph={{ rows: 1 }}
        ></Skeleton>
        <Skeleton
          style={{ width: "100%", marginLeft: "20px" }}
          paragraph={{ rows: 1 }}
        ></Skeleton>
      </div>
    </div>
  );
}
export default forwardRef(OfficalRank);
