import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { PlayCircleOutlined } from "@ant-design/icons";
import Song from "../song";
import { getAlbumDetail } from "../../axios/service/music";
import { connect } from "react-redux";
import PlayAllMusic from "../../utils/playAllMusic";
function AlbumComponent(props) {
  useEffect(() => {
    (async function () {
      const result = await getAlbumDetail(props.id);
      if (result && result.data && result.data.songs)
        setSongs(result.data.songs);
    })();
  }, []);
  const [songs, setSongs] = useState([]);
  const playAllSongs = async () => {
    PlayAllMusic(songs, props.userInfo.isLogin);
  };
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
              onClick={playAllSongs}
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
const a = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
const b = null;
export default connect(a, b)(AlbumComponent);
