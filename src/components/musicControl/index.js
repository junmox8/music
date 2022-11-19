import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  BackwardOutlined,
  ForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import style from "./index.module.scss";
function MusicControl(props) {
  useEffect(() => {
    setState(true);
  }, [props.song]);
  const musicControl = useRef();
  const [playState, setState] = useState(false); //播放状态
  const [singDetail, setDetail] = useState({
    //歌曲信息
    imgUrl: "",
    name: "",
    singer: "",
  });
  const changePlayState = () => {
    if (props.song.length > 5) {
      if (playState === true) musicControl.current.pause();
      if (playState === false) musicControl.current.play();
      setState((state) => !state);
    }
  };
  return (
    <div>
      <audio src={props.song} autoPlay ref={musicControl}></audio>
      <div className={style.musicControl}>
        <div className={style.controlContent}>
          <div className={style.btns}>
            <BackwardOutlined className={style.icon} />
            <PauseCircleOutlined
              onClick={changePlayState}
              style={{ display: playState === true ? "block" : "none" }}
              className={style.icon2}
            ></PauseCircleOutlined>
            <PlayCircleOutlined
              onClick={changePlayState}
              style={{ display: playState === false ? "block" : "none" }}
              className={style.icon2}
            ></PlayCircleOutlined>
            <ForwardOutlined className={style.icon}></ForwardOutlined>
          </div>
        </div>
      </div>
    </div>
  );
}
const a = (state) => {
  return {
    song: state.playSong,
  };
};
const b = (dispatch) => {};
export default connect(a, b)(MusicControl);
