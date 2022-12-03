import React, { useEffect, useState } from "react";
import {
  getSingerAlbum,
  getSingerHotSongs,
} from "../../../axios/service/singers";
import style from "./index.module.scss";
import Song from "../../../components/song";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
export default function Album(props) {
  useEffect(() => {
    (async function () {
      const {
        data: { songs },
      } = await getSingerHotSongs(singerId);
      let arr = [];
      songs.forEach((item) => {
        arr.push(false);
      });
      setSelect(arr);
      setHotSongs(songs);
    })();
  }, []);
  const [getParmas, setParmas] = useSearchParams();
  const [currentPage, setPage] = useState(1); //当前页数
  const [hotSongs, setHotSongs] = useState([]); //热门歌曲
  const [isSelect, setSelect] = useState([]); //热门歌曲单击背景颜色改变
  const singerId = getParmas.get("id");
  const SingleClickHotSong = (index) => {
    let arr = [];
    for (let i = 0; i <= isSelect.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setSelect(arr);
  };
  return (
    <div className={style.main}>
      <div className={style.hotSongImg}></div>
      <div className={style.singContent}>
        <div className={style.firstLine}>
          <div className={style.text}>热门50首</div>
          <PlayCircleOutlined
            style={{ marginLeft: "25px", cursor: "pointer" }}
          ></PlayCircleOutlined>
        </div>
        {hotSongs.map((item, index) => {
          return (
            <Song
              c={SingleClickHotSong}
              name={item.name}
              engName={item.alia.length > 0 ? item.alia[0] : ""}
              key={index}
              index={index}
              id={item.id}
              fee={item.fee} //会员非会员区别
              time={item.dt}
              isSelect={isSelect[index]}
            ></Song>
          );
        })}
      </div>
    </div>
  );
}
