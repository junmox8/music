import React, { useEffect, useState, useRef } from "react";
import style from "./index.module.scss";
import { getMusicDetail } from "../../axios/service/music";
import { useSearchParams, useNavigate } from "react-router-dom";
import PubSub from "pubsub-js";
export default function MusicDetail(props) {
  useEffect(() => {
    (async function () {
      const result = await getMusicDetail(id);
      setSongDetail(result.data);
      PubSub.subscribe("changePlayState", (_, state) => {
        setState((s) => state);
      });
    })();
  }, []);
  const navigate = useNavigate();
  const [searchParams, setParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    //当id参数重置 进入新的页面 重新发请求获取
    (async function () {
      const result = await getMusicDetail(id);
      setSongDetail(result.data);
      setSinger(result.data.songs[0].ar);
      PubSub.subscribe("changePlayState", (_, state) => {
        setState((s) => state);
      });
    })();
  }, [id]);
  const [playState, setState] = useState(true); //播放状态
  useEffect(() => {
    if (playState === true) {
      handle.current.style.left = "-115px";
      handle.current.style.top = "68px";
    } else {
      handle.current.style.left = "10px";
      handle.current.style.top = "10px";
    }
  }, [playState]);

  const [songDetail, setSongDetail] = useState({});
  const [singer, setSinger] = useState([]);
  const handle = useRef();
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
            <span className={style.text}>
              {songDetail.songs && songDetail.songs.length > 0
                ? songDetail.songs[0].al.name
                : ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
