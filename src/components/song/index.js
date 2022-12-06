import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import add0 from "../../utils/add0";
import { message } from "antd";
import { HeartOutlined, DownloadOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import playMusic from "../../utils/playMusic";
import { likeMusic, downloadMusic } from "../../axios/service/music";
import timeFormat from "../../utils/songTimeChange";

function Song(props) {
  useEffect(() => {
    setLike(props.isLike);
    (async function () {
      const {
        data: {
          data: { url },
        },
      } = await downloadMusic(props.id);
      setUrl(url);
    })();
  }, []);
  const [like, setLike] = useState(false); //是否喜欢该歌曲
  const [songUrl, setUrl] = useState("");
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
      <div className={style.xuhao}>{add0(props.index + 1)}</div>
      <div className={style.aixin} onClick={likeOrNotLike}>
        <HeartOutlined
          style={{ color: like === true ? "#EC4141" : "#d7d7d7" }}
        ></HeartOutlined>
      </div>
      <a className={style.download} href={songUrl}>
        <DownloadOutlined></DownloadOutlined>
      </a>
      <div className={style.name}>
        <span style={{ color: "#333333" }}>{props.name}</span>
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
    </div>
  );
}
const a = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
const b = null;
export default connect(a, b)(Song);
