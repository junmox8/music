import React from "react";
import style from "./index.module.scss";
import { useNavigate } from "react-router-dom";
export default function SuggestWord(props) {
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
    <div className={style.main}>
      <div
        className={style.content}
        style={{ display: props.type !== 2 ? "display" : "none" }}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: fn(props.name, props.word),
          }}
        />
        -
        <span
          dangerouslySetInnerHTML={{
            __html: fn(props.artist, props.word),
          }}
        />
      </div>
      <div
        onClick={() => {
          navigate("/playlist/song?id=" + props.id);
        }}
        className={style.content}
        style={{ display: props.type === 2 ? "display" : "none" }}
      >
        <span
          dangerouslySetInnerHTML={{
            __html: fn(props.name, props.word),
          }}
        />
      </div>
    </div>
  );
}
