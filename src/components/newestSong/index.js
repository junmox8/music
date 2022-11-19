import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { PlayCircleFilled, ContactsOutlined } from "@ant-design/icons";
import { Tag, Tooltip, message } from "antd";
import { checkMusic, getMusicUrl } from "../../axios/service/music";
import { connect } from "react-redux";
import { song } from "../../redux/actions/playSong";
function NewestSong(props) {
  useEffect(() => {
    setSingers(JSON.parse(props.singers));
  }, []);
  const [singers, setSingers] = useState([]);
  const playSong = async (id) => {
    const {
      data: { success },
    } = await checkMusic(id);
    if (success === true) {
      const {
        data: { code, data: result },
      } = await getMusicUrl(id);
      if (code === 200) {
        props.song(result[0].url);
        //后续加入播放列表的操作记得补上
      } else message.error("获取歌曲链接失败");
    } else message.error("对不起,该音乐暂无版权");
  };
  return (
    <div className={style.main}>
      <div
        onClick={() => playSong(props.id)}
        style={{
          height: "100%",
          width: "15%",
          position: "relative",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundImage: `url(${props.imgUrl})`,
          backgroundSize: "cover",
        }}
      >
        <PlayCircleFilled className={style.icon}></PlayCircleFilled>
      </div>
      <div className={style.texContain}>
        <div className={style.name}>
          <p className={style.singName}>{props.name}</p>
          <p
            style={{
              display: props.alias.length > 0 ? "inline-block" : "none",
            }}
            className={style.alias}
          >
            ({props.alias})
          </p>
        </div>
        <div className={style.lastContain}>
          <Tooltip
            title={props.company.length === 0 ? "暂无公司" : props.company}
          >
            <Tag>公司</Tag>
          </Tooltip>
          <div className={style.singerText}>
            {singers.map((item, index) => {
              return (
                <span key={index} style={{ display: "flex" }}>
                  <span
                    onClick={() => console.log(item.id)}
                    className={style.singerName}
                  >
                    {item.name}
                  </span>
                  <span
                    style={{
                      display: index === singers.length - 1 ? "none" : "block",
                    }}
                  >
                    /
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
const a = (state) => {
  return {};
};
const b = (dispatch) => {
  return {
    song: (url) => dispatch(song(url)),
  };
};
export default connect(a, b)(NewestSong);
