import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Song2 from "../../../components/song";
import { useSearchParams } from "react-router-dom";
import { connect } from "react-redux";
import { getUserLikeMusics } from "../../../axios/service/music";
import { getSongListDetail } from "../../../axios/service/songlist";
function Song(props) {
  useEffect(() => {
    (async function () {
      const {
        data: { songs },
      } = await getSongListDetail(id);
      let arr = [];
      if (songs && songs instanceof Array) {
        songs.forEach((item) => {
          arr.push(false);
        });
        setSelect(arr);
        setSongs(songs);
      }
      if (props.userInfo.isLogin === true) {
        const {
          data: { ids },
        } = await getUserLikeMusics(props.userInfo.userId);
        props.setUserLikeMusic(ids);
      }
    })();
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [songs, setSongs] = useState([]);
  const [isSelect, setSelect] = useState([]); //热门歌曲单击背景颜色改变
  const SingleClickHotSong = (index) => {
    let arr = [];
    for (let i = 0; i <= isSelect.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setSelect(arr);
  };
  return (
    <div className={style.main}>
      {songs.map((item, index) => {
        return (
          <Song2
            c={SingleClickHotSong}
            key={index}
            name={item.name}
            engName={item.alia.length > 0 ? item.alia[0] : ""}
            index={index}
            id={item.id}
            fee={item.fee} //会员非会员区别
            time={item.dt}
            isSelect={isSelect[index]}
            singer={JSON.stringify(item.ar)}
            album={JSON.stringify(item.al)}
            type={1}
          ></Song2>
        );
      })}
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
export default connect(a, b)(Song);
