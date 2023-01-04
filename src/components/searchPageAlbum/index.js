import React from "react";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
export default function SearchPageAlbumComponent(props) {
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
      className={style.main}
      onClick={() => {
        navigate("/albumDetail/song?id=" + props.id);
      }}
    >
      <img className={style.img} src={props.img}></img>
      <div className={style.name}>
        <span
          dangerouslySetInnerHTML={{
            __html: fn(props.name, props.word),
          }}
        />
      </div>
      <span
        className={style.name22}
        onClick={() => {
          navigate("/singer/album?id=" + props.artistId);
        }}
      >
        <span
          className={style.name1}
          dangerouslySetInnerHTML={{
            __html: fn(props.artistName, props.word),
          }}
        />
        <span
          className={style.name2}
          style={{ display: props.artistName2.length > 0 ? "block" : "none" }}
          dangerouslySetInnerHTML={{
            __html: fn("(" + props.artistName2 + ")", props.word),
          }}
        />
      </span>
    </div>
  );
}
