//歌曲简化版 用于播放器歌单列表
import React from "react";
import style from "./index.module.scss";
import add0 from "../../../utils/add0";
import { NotificationOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import playMusic from "../../../utils/playMusic";
function Song2(props) {
  return (
    <div
      onClick={() => props.c(props.index)}
      className={style.main}
      onDoubleClick={() => {
        playMusic(props.id, 1);
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
      <div
        className={style.xuhao}
        style={{
          display: props.id === props.musicPlaying.id ? "none" : "flex",
        }}
      >
        {add0(props.index + 1)}
      </div>
      <div
        className={style.xuhao}
        style={{
          display: props.id === props.musicPlaying.id ? "flex" : "none",
          color: "#EC4141",
        }}
      >
        <NotificationOutlined />
      </div>
      <div className={style.name}>
        <span
          style={{
            color: props.id === props.musicPlaying.id ? "#EC4141" : "#333333",
          }}
        >
          {props.name}
        </span>
      </div>
      <div className={style.time}>{props.time}</div>
    </div>
  );
}
const a = (state) => {
  return {
    userInfo: state.userInfo,
    userLikeMusic: state.userLikeMusic,
    musicPlaying: state.musicPlaying,
  };
};
const b = null;
export default connect(a, b)(Song2);
