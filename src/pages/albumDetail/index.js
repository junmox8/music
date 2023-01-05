import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { Button } from "antd";
import { CaretRightFilled } from "@ant-design/icons";
import { getAlbumDetail } from "../../axios/service/album";
import PlayAllMusic from "../../utils/playAllMusic";
import dataChange from "../../utils/dateChange";
import { connect } from "react-redux";
import { getUserLikeMusics } from "../../axios/service/music";
import { useSearchParams, useNavigate, Outlet } from "react-router-dom";
import routerArr from "../../json/albumRouterArr";
function AlbumDetail(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const albumId = searchParams.get("id");
  useEffect(() => {
    (async function () {
      const {
        data: { album, songs },
      } = await getAlbumDetail(albumId);
      setInfo(album);
      setArr(songs);
      let arr = [];
      routerArr.forEach((item, index) => {
        arr.push(index === 0 ? true : false);
      });
      setClickArr(arr);
      navigate(routerArr[0].path + "?id=" + albumId, { replace: true });
      if (props.userInfo.isLogin === true) {
        const {
          data: { ids },
        } = await getUserLikeMusics(props.userInfo.userId);
        props.setUserLikeMusic(ids);
      }
    })();
  }, [albumId]);

  const [textInfo, setInfo] = useState({
    id: 0,
    name: "",
    picUrl: "",
    publishTime: 0,
    info: {
      commentCount: 0,
      likedCount: 0,
      shareCount: 0,
      liked: false, //暂未明确功能
    },
    artists: [],
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
    navigate(routerArr[index].path + "?id=" + albumId, {
      state: {
        commentCount: textInfo.info.commentCount,
        description: textInfo.description,
      },
    });
  };
  const playAll = async () => {
    PlayAllMusic(songsArr, props.userInfo.isLogin, props.userInfo.vip);
  };

  return (
    <div className={style.main}>
      <div className={style.title}>
        <div
          className={style.coverImg}
          style={{
            backgroundImage: `url(${textInfo.picUrl})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className={style.textInfo}>
          <div className={style.name}>
            <div className={style.Tag}>专辑</div>
            <div className={style.rankName}>{textInfo.name}</div>
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
          </div>
          <div className={style.countContent}>
            <div
              style={{
                fontSize: "12px",
                color: "#676767",
                display: "flex",
                flexWrap: "nowrap",
              }}
            >
              <span>歌手：</span>
              {textInfo.artists.map((item, index) => {
                return (
                  <span
                    key={index}
                    style={{ display: "flex", flexWrap: "nowrap" }}
                  >
                    <span
                      onClick={() => navigate("/singer/album?id=" + item.id)}
                      style={{ color: "#5091CB", cursor: "pointer" }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        display:
                          index === textInfo.artists.length - 1
                            ? "none"
                            : "block",
                      }}
                    >
                      /
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
          <div className={style.description}>
            时间：{dataChange(textInfo.publishTime)}
          </div>
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
                ({textInfo.info.commentCount}条)
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
const b = (dispatch) => {
  return {
    setUserLikeMusic: (value) =>
      dispatch({
        type: "setUserLikeMusic",
        data: value,
      }),
  };
};
export default connect(a, b)(AlbumDetail);
