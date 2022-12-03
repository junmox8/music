import React from "react";
import style from "./index.module.scss";
import add0 from "../../utils/add0";
import { message } from "antd";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import playMusic from "../../utils/playMusic";
import timeFormat from "../../utils/songTimeChange";
function Song(props) {
  return (
    <div
      onClick={() => props.c(props.index)}
      className={style.main}
      onDoubleClick={() => {
        if ((props.fee === 1 || props.fee === 4) && props.userInfo.vip === 0)
          return message.error("该歌曲需要vip");
        playMusic(props.id);
      }}
      style={{
        backgroundColor:
          props.isSelect === true
            ? "#E5E5E5"
            : (props.index + 1) % 2 === 0
            ? "#fff"
            : "#FAFAFA",
      }}
    >
      <div className={style.xuhao}>{add0(props.index + 1)}</div>
      <div className={style.aixin}>
        <HeartOutlined></HeartOutlined>
      </div>
      <div className={style.download}>
        <DownloadOutlined></DownloadOutlined>
      </div>
      <div className={style.name}>
        <span style={{ color: "#333333" }}>{props.name}</span>
        <span style={{ color: "#B6B6B6" }}>
          {props.engName.length > 0 ? "（" + props.engName + "）" : ""}
        </span>
      </div>
      <div className={style.time}>{timeFormat(props.time / 1000)}</div>
      <div
        className={style.tag}
        style={{
          display: props.fee === 0 || props.fee === 8 ? "none" : "flex",
        }}
      >
        VIP
      </div>
    </div>
  );
}
const a = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
const b = null;
export default connect(a, b)(Song);
