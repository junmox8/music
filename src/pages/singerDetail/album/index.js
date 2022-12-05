import React, { useEffect, useState } from "react";
import {
  getSingerAlbum,
  getSingerHotSongs,
} from "../../../axios/service/singers";
import { getUserLikeMusics } from "../../../axios/service/music";
import style from "./index.module.scss";
import Song from "../../../components/song";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
let isLike = []; //该页面热门五十首 有无喜欢的歌曲
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
      //初始化该页面喜欢的歌曲 在考虑用户登陆状态前都设置为无
      //如果用户登陆了 获取该用户所有喜欢的歌曲
      if (props.userInfo.isLogin === true) {
        const {
          data: { ids },
        } = await getUserLikeMusics(props.userInfo.userId);
        setLikeMusics(ids);
        //查找该页面有多少歌曲被喜欢
        songs.map((item, index) => {
          isLike.push(ids.includes(item.id) ? true : false);
        });
      }
    })();
  }, []);

  const [getParmas, setParmas] = useSearchParams();
  const [currentPage, setPage] = useState(1); //当前页数
  const [hotSongs, setHotSongs] = useState([]); //热门歌曲
  const [isSelect, setSelect] = useState([]); //热门歌曲单击背景颜色改变
  const [likeMusics, setLikeMusics] = useState([]); //该用户喜欢的歌曲

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
              isLike={isLike[index]}
            ></Song>
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
const b = null;
export default connect(a, b)(Album);
