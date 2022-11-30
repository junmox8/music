import React, { useEffect, useState } from "react";
import { getSingerDesc, getSingerDetail } from "../../axios/service/singers";
import { useSearchParams } from "react-router-dom";
import style from "./index.module.scss";
export default function SingerDetail(props) {
  useEffect(() => {
    (async function () {
      const {
        data: {
          data: { artist, identify },
        },
      } = await getSingerDetail(singerId);
      setInfo({
        name: artist.name,
        identify: identify.imageDesc,
        img: artist.cover,
        songCount: artist.musicSize,
        MVCount: artist.mvSize,
      });
    })();
  }, []);
  const [params, setParams] = useSearchParams();
  const singerId = params.get("id");
  const [singerInfo, setInfo] = useState({
    name: "",
    identify: "",
    img: "",
    songCount: 0,
    zhuanjiCount: 0,
    MVCount: 0,
  });
  return (
    <div className={style.singerDetail}>
      <div
        className={style.coverImg}
        style={{
          backgroundImage: `url(${singerInfo.img})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className={style.textInfo}>
        <div className={style.name}>{singerInfo.name}</div>
        <div className={style.identify}>{singerInfo.identify}</div>
      </div>
    </div>
  );
}
