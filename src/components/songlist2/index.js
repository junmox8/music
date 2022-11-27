import React, { forwardRef } from "react";
import style from "./index.module.scss";
import {
  PlayCircleOutlined,
  CaretRightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import SonglistSkeleton2 from "../Skeleton/songList2";
import numberDeal from "../../utils/playCount";
function Songlist2(props, ref) {
  return (
    <div ref={ref}>
      <div
        style={{
          display: props.canSee === false ? "block" : "none",
        }}
      >
        <SonglistSkeleton2></SonglistSkeleton2>
      </div>
      <div
        style={{
          display: props.canSee === false ? "none" : "block",
        }}
        className={style.main}
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
          <div className={style.creatorInfo}>
            <UserOutlined style={{ fontSize: "12px" }}></UserOutlined>
            <div>{props.creatorName}</div>
            <img
              style={{ width: "15px", marginLeft: "3px" }}
              src={props.icon}
            ></img>
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
    </div>
  );
}
export default forwardRef(Songlist2); //解决子组件不能作为ref问题
