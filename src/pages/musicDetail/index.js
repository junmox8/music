import React, { useEffect, useState, useRef, createRef } from "react";
import style from "./index.module.scss";
import { getMusicDetail, getLyric } from "../../axios/service/music";
import timeExchange from "../../utils/timeExchange"; //分秒转秒
import { timeFormat2 } from "../../utils/songTimeChange"; //上面倒置
import { useSearchParams, useNavigate } from "react-router-dom";
import { CaretRightOutlined } from "@ant-design/icons";
import PubSub from "pubsub-js";
let refs = []; //每行歌词 ref
export default function MusicDetail(props) {
  const navigate = useNavigate();
  const [searchParams, setParams] = useSearchParams();
  const id = searchParams.get("id");
  const handle = useRef();
  const scrollDiv = useRef(); //歌词滚动ref
  const middleDiv = useRef(); //歌词滚动中间横条ref
  const scrolls1 = useRef(); //包含true/false 表示歌曲时间是否到当前歌词  ref来实现实时传值
  const scroll2 = useRef(); //包含true/false 表示横杠是否到当前歌词 ref来实现实时传值
  const timeArr = useRef(); //歌词对应的时间 number秒格式 因为不考虑数组变动 故直接用普通数组表示
  useEffect(() => {
    //当id参数重置 进入新的页面 重新发请求获取
    (async function () {
      setShowTime("00:00"); //重置展示时间
      const result = await getMusicDetail(id);
      setSongDetail(result.data);
      setSinger(result.data.songs[0].ar);
      PubSub.subscribe("changePlayState", (_, state) => {
        setState((s) => state);
      });
      PubSub.subscribe("changeTime", (_, value) => {
        setCurrentTime(value);
      });
      const result2 = await getLyric(id);
      let arr = result2.data.lrc.lyric.split(/[(\r\n)\r\n]+/);
      let arr1 = [];
      let arr2 = [];
      arr.forEach((item) => {
        let index1 = item.indexOf("[");
        let index2 = item.indexOf("]");
        arr1.push(timeExchange(item.slice(index1 + 1, index1 + 6))); //获取分秒 00:00  转为秒
        arr2.push(item.slice(index2 + 1, item.length));
      });
      let refArr = [];
      let scrollArr = [];
      let scrollArr2 = [];
      timeArr.current = arr1;
      arr2.forEach((item, index) => {
        //给ref数组补充元素
        refArr.push(createRef());
        scrollArr.push(false);
        scrollArr2.push(false);
      });
      refs = refArr;
      scrolls1.current = scrollArr;
      scroll2.current = scrollArr2;
      setLyricArr(arr2);

      scrollDiv.current.addEventListener("scroll", scroll);
    })();
  }, [id]);
  const [playState, setState] = useState(false); //播放状态
  useEffect(() => {
    if (playState === true) {
      handle.current.style.left = "-115px";
      handle.current.style.top = "68px";
    } else {
      handle.current.style.left = "10px";
      handle.current.style.top = "10px";
    }
  }, [playState]);
  const [currentTime, setCurrentTime] = useState(0); //当前歌曲播放时间
  useEffect(() => {
    if (timeArr && timeArr.current)
      timeArr.current.forEach((item, index) => {
        if (item === currentTime) {
          let arr = scrolls1.current;
          let ind = 0;
          for (let i = 0; i <= arr.length - 1; i++) {
            if (i === index) {
              ind = i;
              arr[i] = true;
            } else arr[i] = false;
          }

          scrolls1.current = arr;
          scrollDiv.current.scrollTop = refs[ind].current.offsetTop - 150;
        }
      });
  }, [currentTime]);
  const [songDetail, setSongDetail] = useState({});
  const [singer, setSinger] = useState([]);
  const [lyricArr, setLyricArr] = useState([]); //歌词数组
  const [showTime, setShowTime] = useState("00:00"); //中间横杠展示的时间
  const scroll = () => {
    const px = middleDiv.current.getBoundingClientRect().top;
    refs.forEach((item, index) => {
      if (item) {
        if (
          item.current.getBoundingClientRect().top <= px + 7 &&
          item.current.getBoundingClientRect().top >= px - 5
        ) {
          setShowTime(timeFormat2(timeArr.current[index]));
          let arr = scroll2.current;
          for (let i = 0; i <= arr.length - 1; i++) {
            if (i === index) arr[i] = true;
            else arr[i] = false;
          }
          scroll2.current = arr;
        }
      }
    });
  };
  const mouseOut = () => {
    const index = scrolls1.current.indexOf(true);
    if (index !== -1) {
      if (refs[index].current.offsetTop) {
        setTimeout(() => {
          scrollDiv.current.scrollTop = refs[index].current.offsetTop - 150;
        }, 1000);
      }
    }
  };
  const changeCurrentTime = () => {
    PubSub.publish("changeCurrentTime", timeExchange(showTime));
  };
  return (
    <div className={style.main}>
      <div className={style.titleContent}>
        <div className={style.left}>
          <div className={style.icon1}>
            <div
              className={style.icon2}
              style={{
                transform: `rotateZ(${playState === true ? "80deg" : "0deg"})`,
              }}
              ref={handle}
            ></div>
          </div>
          <div
            className={style.circle1}
            style={{
              animationPlayState: playState === true ? "running" : "paused",
            }}
          >
            <div className={style.circle2}>
              <div
                className={style.circle3}
                style={{
                  backgroundImage: `url(${
                    songDetail.songs && songDetail.songs.length > 0
                      ? songDetail.songs[0].al.picUrl
                      : ""
                  })`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className={style.right}>
          <div className={style.title}>
            {songDetail.songs && songDetail.songs.length > 0
              ? songDetail.songs[0].name
              : ""}
          </div>
          <div className={style.singer}>
            <span>歌手:&nbsp;</span>
            {singer.map((item, index) => {
              return (
                <span
                  key={index}
                  className={style.text}
                  onClick={() => {
                    navigate("/singer?id=" + item.id);
                  }}
                >
                  {item.name}
                </span>
              );
            })}
          </div>
          <div className={style.album}>
            <span>专辑:&nbsp;</span>
            <span
              className={style.text}
              onClick={() =>
                navigate("/albumDetail?id=" + songDetail.songs[0].al.id)
              }
            >
              {songDetail.songs && songDetail.songs.length > 0
                ? songDetail.songs[0].al.name
                : ""}
            </span>
          </div>
          <div className={style.lyrics}>
            <div
              className={style.content}
              ref={scrollDiv}
              onMouseLeave={mouseOut}
            >
              {lyricArr.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      marginTop: "8px",
                      fontWeight:
                        scrolls1.current[index] === true ||
                        scroll2.current[index] === true
                          ? "700"
                          : "400",
                      fontSize:
                        scrolls1.current[index] === true ? "20px" : "14px",
                      color:
                        scrolls1.current[index] === true
                          ? "black"
                          : scroll2.current[index] === true
                          ? "#484848"
                          : "",
                    }}
                    ref={refs[index]}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div className={style.middleDiv} ref={middleDiv}>
              <div className={style.showTime}>{showTime}</div>
              <div className={style.line}>
                <div className={style.line1}></div>
                <div className={style.line2}></div>
                <div className={style.line3}></div>
              </div>
              <div className={style.playIcon} onClick={changeCurrentTime}>
                <CaretRightOutlined></CaretRightOutlined>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
