import React from "react";
import { useNavigate } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import count from "../../utils/playCount";
import style from "./index.module.scss";
export default function SearchPagePlaylist(props) {
  const navigate = useNavigate();
  const fn = function (label, searchStr) {
    if (typeof label == "string" && typeof searchStr == "string") {
      const reg = new RegExp(searchStr, "gi");
      let start = 0;
      let end = 0;
      let newStr = "";
      let arr;
      while ((arr = reg.exec(label)) !== null) {
        end = arr.index;
        newStr = newStr + label.slice(start, end);
        start = end;
        end = reg.lastIndex;
        newStr =
          newStr +
          `<span style="color: #507daf">${label.slice(start, end)}</span>`;
        start = end;
      }
      newStr = newStr + label.slice(end);
      return newStr;
    }
  };
  return (
    <div
      onClick={() => {
        navigate("/playlist/song?id=" + props.id);
      }}
      style={{
        backgroundColor: (props.index + 1) % 2 === 0 ? "#FAFAFA" : "#fff",
      }}
      className={style.main}
    >
      <img className={style.img} src={props.img}></img>
      <div className={style.name}>
        <span
          dangerouslySetInnerHTML={{
            __html: fn(props.name, props.word),
          }}
        />
      </div>
      <div className={style.trackCount}>
        <span>{props.songCount}首</span>
      </div>
      <div className={style.artist}>
        <span style={{ color: "#919192", marginRight: "5px" }}>by</span>
        <span
          className={style.artistName}
          dangerouslySetInnerHTML={{
            __html: fn(props.artistName, props.word),
          }}
        />
      </div>
      <div className={style.playCount}>
        <PlayCircleOutlined></PlayCircleOutlined>
        <span>{count(props.playCount)}</span>
      </div>
    </div>
  );
}
