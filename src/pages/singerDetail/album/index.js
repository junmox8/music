import React, { useEffect, useState } from "react";
import {
  getSingerAlbum,
  getSingerHotSongs,
} from "../../../axios/service/singers";
import style from "./index.module.scss";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
export default function Album(props) {
  useEffect(() => {
    (async function () {
      const {
        data: { songs },
      } = await getSingerHotSongs(singerId);
      console.log(songs);
      setHotSongs(songs);
    })();
  }, []);
  const [getParmas, setParmas] = useSearchParams();
  const [currentPage, setPage] = useState(1); //当前页数
  const [hotSongs, setHotSongs] = useState([]); //热门歌曲
  const singerId = getParmas.get("id");
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
      </div>
    </div>
  );
}
