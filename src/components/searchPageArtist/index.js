import React from "react";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
export default function SearchPageArtistComponent(props) {
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
      style={{
        backgroundColor: (props.index + 1) % 2 === 0 ? "#FAFAFA" : "#fff",
      }}
      className={style.main}
      onClick={() => {
        navigate("/singer/album?id=" + props.id);
      }}
    >
      <img className={style.img} src={props.avatar}></img>
      <span className={style.name}>
        <span
          className={style.name1}
          dangerouslySetInnerHTML={{
            __html: fn(props.name, props.word),
          }}
        />
        <span
          className={style.name2}
          style={{ display: props.name2.length > 0 ? "block" : "none" }}
          dangerouslySetInnerHTML={{
            __html: fn("(" + props.name2 + ")", props.word),
          }}
        />
      </span>
      <img
        className={style.icon}
        src={
          "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1672818212486"
        }
      ></img>
    </div>
  );
}
