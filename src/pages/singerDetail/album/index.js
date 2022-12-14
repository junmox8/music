import React, { useEffect, useState, useRef } from "react";
import {
  getSingerAlbum,
  getSingerHotSongs,
} from "../../../axios/service/singers";
import { getUserLikeMusics } from "../../../axios/service/music";
import PlayAllMusic from "../../../utils/playAllMusic";
import style from "./index.module.scss";
import Song from "../../../components/song";
import AlbumComponent from "../../../components/album";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
let timeInterval = null; //滚动节流
function Album(props) {
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

      //获取第一页专辑
      const {
        data: { hotAlbums },
      } = await getSingerAlbum(singerId, currentPage);
      setPage((page) => page + 1);
      setAlbums(hotAlbums);
      //初始化该页面喜欢的歌曲 在考虑用户登陆状态前都设置为无
      //如果用户登陆了 获取该用户所有喜欢的歌曲
      if (props.userInfo.isLogin === true) {
        const {
          data: { ids },
        } = await getUserLikeMusics(props.userInfo.userId);
        props.setUserLikeMusic(ids);
      }
    })();
  }, []);
  const [getParmas, setParmas] = useSearchParams();
  const [currentPage, setPage] = useState(1); //当前页数
  const [hotSongs, setHotSongs] = useState([]); //热门歌曲
  const [isSelect, setSelect] = useState([]); //热门歌曲单击背景颜色改变
  const [albums, setAlbums] = useState([]);
  const page = useRef();
  const singerId = getParmas.get("id");
  const SingleClickHotSong = (index) => {
    let arr = [];
    for (let i = 0; i <= isSelect.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setSelect(arr);
  };
  const scroll = async () => {
    //节流
    if (!timeInterval) {
      if (page.current.scrollHeight <= page.current.scrollTop + 1200) {
        timeInterval = setTimeout(() => {
          clearTimeout(timeInterval);
          timeInterval = null;
        }, 1000);
        const {
          data: { hotAlbums },
        } = await getSingerAlbum(singerId, currentPage);
        setPage((page) => page + 1);
        let arr = [...albums, ...hotAlbums];
        setAlbums(arr);
      }
    }
  };
  const playAllSongs = async () => {
    PlayAllMusic(hotSongs, props.userInfo.isLogin, props.userInfo.vip);
  };

  return (
    <div className={style.main} onScroll={scroll} ref={page}>
      <div className={style.hotContent}>
        <div className={style.hotSongImg}></div>
        <div className={style.singContent}>
          <div className={style.firstLine}>
            <div className={style.text}>热门50首</div>
            <PlayCircleOutlined
              onClick={playAllSongs}
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
      <div className={style.albumContent}>
        {albums.map((item, index) => {
          return (
            <AlbumComponent
              img={item.picUrl}
              key={index}
              name={item.name}
              id={item.id}
            ></AlbumComponent>
          );
        })}
      </div>
    </div>
  );
}
const a = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
const b = (dispatch) => {
  return {
    setUserLikeMusic: (value) =>
      dispatch({
        type: "setUserLikeMusic",
        data: value,
      }),
  };
};
export default connect(a, b)(Album);
