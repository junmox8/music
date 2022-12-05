import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Slider, Space, Tooltip, Popover } from "antd";
import timeFormat from "../../utils/songTimeChange";
import arrGetRid from "../../utils/arrGetRid";
import playMusic from "../../utils/playMusic";
import PrevOrNextPlayMusic from "../../utils/prevOrNextPlayMusic";
import {
  BackwardOutlined,
  ForwardOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  RetweetOutlined, //顺序播放
  SwapOutlined, //随机播放
  RollbackOutlined, //单曲循环
  SoundOutlined,
} from "@ant-design/icons";
import style from "./index.module.scss";
import { getMusicDetail, getMusicUrl } from "../../axios/service/music";
import pubsub from "pubsub-js";
let timeInterval = null;
function MusicControl(props) {
  const [playState, setState] = useState(false); //播放状态
  const musicControl = useRef();
  const [singDetail, setDetail] = useState({
    //歌曲信息
    imgUrl: "",
    name: "",
    singer: "",
    time: "", //以秒为单位
    songUrl: "",
    id: 0,
  });
  const [slideLength, setLength] = useState(0); //当前进度条进度 以秒为单位
  const [playModel, setModel] = useState(0); //0顺序播放 1循环播放 2随机播放
  const [audioSound, setSound] = useState(100); //音量大小
  useEffect(() => {
    //只要有歌曲传进来 立马进入播放状态
    setState((state) => true);
    if (timeInterval) {
      clearInterval(timeInterval);
      timeInterval = null;
    } //清空定时器
    timeInterval = setInterval(() => {
      setLength((value) => value + 1); //同步更新
    }, 1000);
  }, [singDetail]);
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
        songUrl: obj.songUrl,
        id: obj.id,
      });
      setLength(0); //进度条清零
      //把歌曲加到歌单列表
      let arr = props.songsArr;
      arr.unshift({
        name: obj.name,
        singer: str,
        time: timeFormat(obj.time / 1000),
        id: obj.id,
      });
      props.setSongsArr(arrGetRid(arr));
    });
    pubsub.subscribe("prevOrNext", (_, obj) => {
      //上一首/下一首
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
        songUrl: obj.songUrl,
        id: obj.id,
      });
      setLength(0); //进度条清零
    });
    setState((state) => false); //初始化停止播放歌曲
  }, []);

  useEffect(() => {
    //如果歌曲播放 立马进入计时器
    if (playState === true) {
      if (slideLength >= Number(singDetail.time) - 1) {
        clearInterval(timeInterval);
        timeInterval = null;
      } else {
        if (timeInterval) {
          clearInterval(timeInterval);
          timeInterval = null;
        }
        timeInterval = setInterval(() => {
          if (slideLength >= Number(singDetail.time) - 1) {
            clearInterval(timeInterval);
            timeInterval = null;
          }
          setLength((value) => value + 1); //同步更新
        }, 1000);
      }
    } else {
      clearInterval(timeInterval);
      timeInterval = null;
    }
  }, [playState]);
  useEffect(() => {
    if (slideLength >= Number(singDetail.time) - 1) {
      clearInterval(timeInterval);
      timeInterval = null;
      if (playModel === 0) {
        //顺序播放
        props.songsArr.map((item, index) => {
          if (item.id === singDetail.id) {
            if (index !== props.songsArr.length - 1) {
              playMusic(props.songsArr[index + 1].id);
            } else {
              playMusic(props.songsArr[0].id);
            }
          }
        });
      }
      if (playModel === 1) {
        //单曲循环
        playMusic(singDetail.id);
      }
      if (playModel === 2) {
        //随机播放
        const index = Math.floor(Math.random() * props.songsArr.length);
        playMusic(props.songsArr[index].id);
      }
    }
  }, [slideLength]);

  const changePlayState = () => {
    if (singDetail.songUrl.length > 5) {
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
  const onChange2 = (value) => {
    setSound(value);
    musicControl.current.volume = Number(value) / 100;
  };
  const prevOrNext = (type) => {
    //0为prev 1为next
    //这里默认歌曲列表的歌都是有权限的 后续添加歌曲之前记得判断权限
    //不调用playMusic方法 因为此方法会导致播放歌曲时 歌曲位置改变
    props.songsArr.map((item, index) => {
      if (item.id == singDetail.id) {
        if (
          (index !== props.songsArr.length - 1 && type === 1) ||
          (index !== 0 && type === 0)
        )
          PrevOrNextPlayMusic(
            type === 0
              ? props.songsArr[index - 1].id
              : props.songsArr[index + 1].id
          );
        else
          PrevOrNextPlayMusic(
            type === 0
              ? props.songsArr[props.songsArr.length - 1].id
              : props.songsArr[0].id
          );
      }
    });
  };
  return (
    <div>
      <audio src={singDetail.songUrl} autoPlay ref={musicControl}></audio>
      <div className={style.musicControl}>
        <div className={style.controlContent}>
          <div className={style.btns}>
            <BackwardOutlined
              className={style.icon}
              onClick={() => prevOrNext(0)}
            />
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
            <ForwardOutlined
              className={style.icon}
              onClick={() => prevOrNext(1)}
            ></ForwardOutlined>
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
                  disabled={singDetail.songUrl.length > 4 ? false : true}
                />
                <div className={style.time}>
                  <span>{timeFormat(slideLength)}</span>
                  <span>/</span>
                  <span style={{ color: "#747474" }}>
                    {timeFormat(singDetail.time)}
                  </span>
                </div>
                <div className={style.iconContent}>
                  <Space>
                    <Popover
                      content={
                        <div>
                          <Slider
                            style={{ height: "200px" }}
                            vertical="true"
                            value={audioSound}
                            max={100}
                            min={0}
                            onChange={onChange2}
                          ></Slider>
                        </div>
                      }
                    >
                      <SoundOutlined></SoundOutlined>
                    </Popover>
                    <Tooltip
                      title={
                        playModel === 0
                          ? "顺序播放"
                          : playModel === 1
                          ? "单曲循环"
                          : "随机播放"
                      }
                    >
                      <RetweetOutlined
                        onClick={() => {
                          setModel(1);
                        }}
                        style={{ display: playModel === 0 ? "block" : "none" }}
                      ></RetweetOutlined>

                      <RollbackOutlined
                        onClick={() => {
                          setModel(2);
                        }}
                        style={{ display: playModel === 1 ? "block" : "none" }}
                      ></RollbackOutlined>
                      <SwapOutlined
                        onClick={() => {
                          setModel(0);
                        }}
                        style={{ display: playModel === 2 ? "block" : "none" }}
                      ></SwapOutlined>
                    </Tooltip>
                  </Space>
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
    songsArr: state.songsArr,
  };
};
const b = (dispatch) => {
  return {
    setSongsArr: (value) => dispatch({ type: "setSongsArr", data: value }),
    addSongToArr: (value) => dispatch({ type: "addSongToArr", data: value }),
  };
};
export default connect(a, b)(MusicControl);
