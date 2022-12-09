import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import dataChange from "../../utils/dateChange";
import { getRankDetail } from "../../axios/service/rank";
import { useSearchParams } from "react-router-dom";
export default function PlaylistDetail() {
  useEffect(() => {
    (async function () {
      const {
        data: { playlist },
      } = await getRankDetail(rankId);
      console.log(playlist);
      setInfo(playlist);
      setArr(playlist.tracks);
    })();
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const [textInfo, setInfo] = useState({
    id: 0,
    name: "",
    coverImgUrl: "",
    playCount: 0,
    subscribedCount: 0, //收藏数量
    trackCount: 0, //歌曲数量
    updateTime: "",
    creator: {
      avatarUrl: "",
      nickname: "",
      userId: 0,
      userType: 0,
      vipType: 0,
      avatarDetail: {
        identityIconUrl: "",
      },
    },
  });
  const [songsArr, setArr] = useState([]);
  const rankId = searchParams.get("id");
  return (
    <div className={style.main}>
      <div className={style.title}>
        <div
          className={style.coverImg}
          style={{
            backgroundImage: `url(${textInfo.coverImgUrl})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className={style.textInfo}>
          <div className={style.name}>
            <div className={style.Tag}>歌单</div>
            <div className={style.rankName}>{textInfo.name}</div>
          </div>
          <div className={style.userInfo}>
            <div
              className={style.userAvatar}
              style={{
                backgroundImage: `url(${textInfo.creator.avatarUrl})`,
                backgroundSize: "cover",
              }}
            >
              <div
                className={style.icon}
                style={{
                  backgroundImage: `url(${textInfo.creator.avatarDetail.identityIconUrl})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className={style.nickName}>{textInfo.creator.nickname}</div>
            <div className={style.updateTime}>
              最近更新: {dataChange(textInfo.updateTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
