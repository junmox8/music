import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import add0 from "../../utils/add0";
import { message } from "antd";
import {
  HeartOutlined,
  DownloadOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import playMusic from "../../utils/playMusic";
import { likeMusic, downloadMusic } from "../../axios/service/music";
import timeFormat from "../../utils/songTimeChange";
function Song(props) {
  useEffect(() => {
    setLike(props.userLikeMusic.includes(props.id) ? true : false);
    (async function () {
      const result = await downloadMusic(props.id);
      if (result && result.data && result.data.data && result.data.data.url)
        setUrl(result.data.data.url);
      else setUrl("");
      if (props.type === 1) {
        setSingerText(JSON.parse(props.singer));
        setAlbumText(JSON.parse(props.album));
      }
    })();
  }, []);
  const [like, setLike] = useState(false); //是否喜欢该歌曲
  const [songUrl, setUrl] = useState("");
  const [singerText, setSingerText] = useState([]); //type为1 展示歌手字符串
  const [albumText, setAlbumText] = useState({}); //type为1 展示专辑字符串
  const navigate = useNavigate();
  const likeOrNotLike = async () => {
    if (props.userInfo.isLogin === true) {
      const result = await likeMusic(props.id, !like);
      if (result.data.code === 200) {
        if (like === false) message.success("喜欢该歌曲");
        else message.success("取消喜欢该歌曲");
        setLike((value) => !value);
      } else message.error("操作失败,请稍后重试");
    } else message.error("请先登录");
  };
  return (
    <div
      onClick={() => props.c(props.index)}
      className={style.main}
      onDoubleClick={() => {
        if ((props.fee === 1 || props.fee === 4) && props.userInfo.vip === 0)
          return message.error("该歌曲需要vip");
        playMusic(props.id);
      }}
      style={{
        backgroundColor:
          props.isSelect === true
            ? "#E5E5E5"
            : (props.index + 1) % 2 === 0
            ? "#fff"
            : "#FAFAFA",
      }}
    >
      <div
        className={style.xuhao}
        style={{
          display: props.id === props.musicPlaying.id ? "none" : "flex",
        }}
      >
        {add0(props.index + 1)}
      </div>
      <div
        className={style.xuhao}
        style={{
          display: props.id === props.musicPlaying.id ? "flex" : "none",
          color: "#EC4141",
        }}
      >
        <NotificationOutlined />
      </div>
      <div className={style.aixin} onClick={likeOrNotLike}>
        <HeartOutlined
          style={{ color: like === true ? "#EC4141" : "#d7d7d7" }}
        ></HeartOutlined>
      </div>
      <a className={style.download} href={songUrl}>
        <DownloadOutlined></DownloadOutlined>
      </a>
      <div className={style.name}>
        <span
          style={{
            color: props.id === props.musicPlaying.id ? "#EC4141" : "#333333",
          }}
        >
          {props.name}
        </span>
        <span style={{ color: "#B6B6B6" }}>
          {props.engName.length > 0 ? "（" + props.engName + "）" : ""}
        </span>
      </div>
      <div className={style.time}>{timeFormat(props.time / 1000)}</div>
      <div
        className={style.tag}
        style={{
          display: props.fee === 0 || props.fee === 8 ? "none" : "flex",
        }}
      >
        VIP
      </div>
      <div
        style={{ display: props.type === 1 ? "block" : "none" }}
        className={style.singer}
      >
        {singerText.map((item, index) => {
          return (
            <span
              onClick={() => navigate("/singer/album?id=" + item.id)}
              style={{ marginRight: "5px" }}
              key={index}
              id={item.id}
            >
              {item.name}
            </span>
          );
        })}
      </div>
      <div
        style={{ display: props.type === 1 ? "block" : "none" }}
        className={style.album}
        onClick={() => navigate("/albumDetail?id=" + albumText.id)}
      >
        <span>{albumText.name}</span>
      </div>
    </div>
  );
}
Song.defaultProps = {
  type: 0, //默认没有歌手和专辑那一栏
};
const a = (state) => {
  return {
    userInfo: state.userInfo,
    userLikeMusic: state.userLikeMusic,
    musicPlaying: state.musicPlaying,
  };
};
const b = null;
export default connect(a, b)(Song);
