import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { PlayCircleFilled } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";
import playMusic from "../../utils/playMusic";
export default function NewestSong(props) {
  useEffect(() => {
    setSingers(JSON.parse(props.singers));
  }, []);
  const [singers, setSingers] = useState([]);
  return (
    <div className={style.main}>
      <div
        onClick={() => playMusic(props.id)}
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
