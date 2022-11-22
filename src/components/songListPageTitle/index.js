import React from "react";
import style from "./index.module.scss";
import { CrownOutlined } from "@ant-design/icons";
import { Space } from "antd";
export default function SonglistPageTitle(props) {
  return (
    <div
      className={style.main}
      style={{ display: props.display === true ? "block" : "none" }}
    >
      <div
        className={style.bgi}
        style={{
          backgroundImage: `url(${props.img})`,
        }}
      ></div>
      <div className={style.contentBox}>
        <img src={props.img} style={{ height: "80%" }}></img>
        <div className={style.textBox}>
          <div className={style.btn}>
            <CrownOutlined></CrownOutlined>
            <div style={{ marginLeft: "5px" }}>精品歌单</div>
          </div>
          <div className={style.name}>{props.name}</div>
        </div>
      </div>
    </div>
  );
}
