import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { PlayCircleOutlined } from "@ant-design/icons";
import Song from "../song";
import { getAlbumDetail } from "../../axios/service/music";
export default function AlbumComponent(props) {
  useEffect(() => {
    (async function () {
      const {
        data: { songs },
      } = await getAlbumDetail(props.id);
      setSongs(songs);
    })();
  }, []);
  const [songs, setSongs] = useState([]);
  return (
    <div className={style.main}>
      <div className={style.hotContent}>
        <div
          className={style.hotSongImg}
          style={{ backgroundImage: `url(${props.img})` }}
        ></div>
        <div className={style.singContent}>
          <div className={style.firstLine}>
            <div className={style.text}>{props.name}</div>
            <PlayCircleOutlined
              // onClick={playAllSongs}
              style={{ marginLeft: "25px", cursor: "pointer" }}
            ></PlayCircleOutlined>
          </div>
          {songs.map((item, index) => {
            return (
              <Song
                c={() => {}}
                name={item.name}
                engName={item.alia.length > 0 ? item.alia[0] : ""}
                key={index}
                index={index}
                id={item.id}
                fee={item.fee} //会员非会员区别
                time={item.dt}
              ></Song>
            );
          })}
        </div>
      </div>
    </div>
  );
}
