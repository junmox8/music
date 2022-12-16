import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Song2 from "../../../components/song";
import { useSearchParams } from "react-router-dom";
import { getSongListDetail } from "../../../axios/service/songlist";
export default function Song() {
  useEffect(() => {
    (async function () {
      const {
        data: { songs },
      } = await getSongListDetail(id);
      let arr = [];
      songs.forEach((item) => {
        arr.push(false);
      });
      setSelect(arr);
      setSongs(songs);
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
          ></Song2>
        );
      })}
    </div>
  );
}
