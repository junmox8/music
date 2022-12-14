import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import dataChange from "../../utils/dateChange";
import { Button, message } from "antd";
import { CaretRightFilled, FileAddOutlined } from "@ant-design/icons";
import { getRankDetail } from "../../axios/service/rank";
import dealWithCount from "../../utils/playCount";
import PlayAllMusic from "../../utils/playAllMusic";
import {
  getSongListDetail,
  subscribePlaylist,
} from "../../axios/service/songlist";
import { connect } from "react-redux";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";
import routerArr from "../../json/songListRouterArr";
function PlaylistDetail(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const rankId = searchParams.get("id");
  useEffect(() => {
    (async function () {
      const {
        data: { playlist },
      } = await getRankDetail(rankId);
      setInfo(playlist);
      setArr(playlist.tracks);
      let arr = [];
      routerArr.forEach((item, index) => {
        arr.push(index === 0 ? true : false);
      });
      setClickArr(arr);
      navigate(routerArr[0].path + "?id=" + rankId, { replace: true });
    })();
  }, [rankId]);

  const [textInfo, setInfo] = useState({
    id: 0,
    name: "",
    coverImgUrl: "",
    playCount: 0,
    subscribedCount: 0, //收藏数量
    trackCount: 0, //歌曲数量
    commentCount: 0, //评论数量
    description: "",
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

  const navigate = useNavigate();
  const [clickArr, setClickArr] = useState([]); //判断有没有点击路由
  const click = (index) => {
    let arr = [];
    for (let i = 0; i <= clickArr.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setClickArr(arr);
    navigate(routerArr[index].path + "?id=" + rankId, {
      state: {
        commentCount: textInfo.commentCount,
      },
    });
  };
  const playAll = async () => {
    const {
      data: { songs },
    } = await getSongListDetail(rankId);
    PlayAllMusic(songs, props.userInfo.isLogin, props.userInfo.vip);
  };

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
                  backgroundImage: `url(${
                    textInfo.creator &&
                    textInfo.creator.avatarDetail &&
                    textInfo.creator.avatarDetail.identityIconUrl
                      ? textInfo.creator.avatarDetail.identityIconUrl
                      : ""
                  })`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>
            <div className={style.nickName}>{textInfo.creator.nickname}</div>
            <div className={style.updateTime}>
              最近更新: {dataChange(textInfo.updateTime)}
            </div>
          </div>
          <div className={style.btnContent}>
            <Button
              style={{
                backgroundColor: "#EC4141",
                border: "1px solid #EC4141",
              }}
              type="primary"
              shape="round"
              icon={<CaretRightFilled />}
              onClick={playAll}
            >
              播放全部
            </Button>
            {/* <Button
              style={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
                marginLeft: "10px",
                color: "#373737",
              }}
              type="primary"
              shape="round"
              icon={<FileAddOutlined />}
            >
              收藏({dealWithCount(textInfo.subscribedCount)})
            </Button> */}
          </div>
          <div className={style.countContent}>
            <div style={{ fontSize: "12px", color: "#676767" }}>
              歌曲：{textInfo.trackCount}
            </div>
            <div
              style={{ fontSize: "12px", color: "#676767", marginLeft: "15px" }}
            >
              播放：{dealWithCount(textInfo.playCount)}
            </div>
          </div>
          <div className={style.description}>简介：{textInfo.description}</div>
        </div>
      </div>
      <div className={style.routerLine}>
        {routerArr.map((item, index) => {
          return (
            <div
              className={`
            ${clickArr[index] === true ? style.clickLink : ""}`}
              onClick={() => click(index)}
              key={index}
            >
              {item.name}
              <span style={{ display: index === 1 ? "display" : "none" }}>
                ({textInfo.commentCount}条)
              </span>
              <div
                className={style.redLine}
                style={{ display: clickArr[index] === true ? "block" : "none" }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className={style.content}>
        <Outlet></Outlet>
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
export default connect(a, b)(PlaylistDetail);
