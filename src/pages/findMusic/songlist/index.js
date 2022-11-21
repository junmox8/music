import React, { useState, useEffect, useRef } from "react";
import { getSongListTag } from "../../../axios/service/songlist";
import { RightOutlined } from "@ant-design/icons";
import SonglistPageTitle from "../../../components/songListPageTitle";
import tagArr from "../../../json/songListTag";
import style from "./index.module.scss";
export default function Songlist() {
  useEffect(() => {
    (async function () {
      const result = await getSongListTag();
      console.log(result);
      console.log(tagArr);
    })();
  }, []);
  const [selectTag, setTag] = useState("");
  const select = (name) => {
    //选择标签
    setTag(name);
  };
  return (
    <div className={style.main}>
      <SonglistPageTitle></SonglistPageTitle>
      <div className={style.tagContent}>
        <div className={style.btn}>
          全部歌单
          <RightOutlined></RightOutlined>
        </div>
        <div className={style.tags}>
          {tagArr.map((item, index) => {
            return (
              <div
                onClick={() => select(item)}
                className={style.tag}
                key={index}
                style={{
                  color: selectTag === item ? "#EC4141" : "#373737",
                  backgroundColor:
                    selectTag === item ? "#FEF5F5" : "transparent",
                }}
              >
                &nbsp;&nbsp;{item}&nbsp;&nbsp;
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
