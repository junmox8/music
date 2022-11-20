import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Slider } from "antd";
import timeFormat from "../../utils/songTimeChange";
import {
  BackwardOutlined,
  ForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
} from "@ant-design/icons";
import style from "./index.module.scss";
import pubsub from "pubsub-js";
let timeInterval = "";
function MusicControl(props) {
  useEffect(() => {
    //只要有歌曲传进来 立马进入播放状态
    setState(true);
  }, [props.song]);
  useEffect(() => {
    //对传入的歌曲信息进行处理
    pubsub.subscribe("musicInfo", (_, obj) => {
      let str = "";
      JSON.parse(obj.singers).map((item, index) => {
        if (index === JSON.parse(obj.singers).length - 1) str += item.name;
        else str += item.name + "/";
      });
      setDetail({
        imgUrl: obj.img,
        name: obj.name,
        singer: str,
        time: obj.time / 1000,
      });
      setLength(0); //进度条清零
    });
  }, []);
  const [playState, setState] = useState(false); //播放状态
  useEffect(() => {
    //如果歌曲播放 立马进入计时器
    if (playState === true) {
      if (slideLength >= singDetail.time) return clearInterval(timeInterval);
      timeInterval = setInterval(() => {
        if (slideLength === singDetail.time) return clearInterval(timeInterval);
        setLength((value) => value + 1); //同步更新
      }, 1000);
    } else {
      clearInterval(timeInterval);
    }
  }, [playState]);
  const musicControl = useRef();
  const [singDetail, setDetail] = useState({
    //歌曲信息
    imgUrl: "",
    name: "",
    singer: "",
    time: "", //以秒为单位
  });
  const [slideLength, setLength] = useState(0); //当前进度条进度
  const changePlayState = () => {
    if (props.song.length > 5) {
      if (playState === true) musicControl.current.pause();
      if (playState === false) musicControl.current.play();
      setState((state) => !state);
    }
  };
  const onChange = (value) => {
    setLength(value);
  };
  const onAfterChange = (value) => {
    musicControl.current.currentTime = value;
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
          <div className={style.songDetail}>
            <div
              style={{
                height: "80%",
                width: "40px",
                borderRadius: "5px",
                cursor: "pointer",
                backgroundImage: `url(${singDetail.imgUrl})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div className={style.otherDetail}>
              <div className={style.textContent}>
                <div className={style.name}>{singDetail.name || "未选择"}</div>
                <div className={style.singer}>
                  {singDetail.singer || "未选择"}
                </div>
              </div>
              <div className={style.slider}>
                <Slider
                  style={{
                    width: "90%",
                  }}
                  tooltip={{
                    formatter: null,
                  }}
                  defaultValue={0}
                  value={slideLength}
                  min={0}
                  max={singDetail.time}
                  onChange={onChange}
                  onAfterChange={onAfterChange}
                  disabled={props.song.length > 4 ? false : true}
                />
                <div className={style.time}>
                  <span>{timeFormat(slideLength)}</span>
                  <span>/</span>
                  <span style={{ color: "#747474" }}>
                    {timeFormat(singDetail.time)}
                  </span>
                </div>
              </div>
            </div>
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
