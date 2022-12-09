import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { PlayCircleFilled } from "@ant-design/icons";
import { getRankList } from "../../axios/service/rank";
import playMusic from "../../utils/playMusic";
import { useNavigate } from "react-router-dom";
export default function RankComponent(props) {
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      const {
        data: {
          playlist: { tracks },
        },
      } = await getRankList(props.id);
      setSongs(tracks.slice(0, 5));
    })();
  }, []);
  const [songs, setSongs] = useState([]);
  return (
    <div className={style.main}>
      <div
        className={style.imgContainer}
        onClick={() => {
          navigate("/playlist?id=" + props.id);
        }}
      >
        <img src={props.img}></img>
        <div className={style.text}>{props.time}</div>
        <div className={style.iconContainer}>
          <PlayCircleFilled
            style={{ color: "#ec4141", fontSize: "46px" }}
          ></PlayCircleFilled>
        </div>
      </div>
      <div className={style.singList}>
        {songs.map((item, index) => {
          return (
            <div className={style.listContainer} key={index}>
              <div
                className={style.id}
                style={{ color: index <= 2 ? "#EC4141" : "#9C9CA4" }}
              >
                {index + 1}
              </div>
              <div className={style.name}>
                <span onClick={() => playMusic(item.id)}>{item.name}</span>
                <span style={{ color: "#999999" }}>
                  {item.tns && item.tns.length > 0
                    ? `(${item.tns[0]})`
                    : item.alia && item.alia.length > 0
                    ? `(${item.alia[0]})`
                    : ""}
                </span>
              </div>
              <div className={style.singer}>
                {item.ar.map((item, index) => {
                  return (
                    <span key={index} className={style.singerName}>
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div
          onClick={() => {
            navigate("/playlist?id=" + props.id);
          }}
          className={style.lookAll}
        >
          查看全部
        </div>
      </div>
    </div>
  );
}
