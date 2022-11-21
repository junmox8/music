import React, { useState, useEffect, useRef } from "react";
import { getSongListTag } from "../../../axios/service/songlist";
import { RightOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import SonglistPageTitle from "../../../components/songListPageTitle";
import tagArr from "../../../json/songListTag";
import style from "./index.module.scss";
export default function Songlist() {
  useEffect(() => {
    (async function () {
      const result = await getSongListTag();
      console.log(result);
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
        <Popover
          placement="bottom"
          title={
            <div className={style.popTitle}>
              <div
                onClick={() => select("全部歌单")}
                style={{
                  color: selectTag === "全部歌单" ? "#EC4141" : "#373737",
                  backgroundColor:
                    selectTag === "全部歌单" ? "#FEF5F5" : "transparent",
                }}
                className={style.tag}
              >
                &nbsp;&nbsp;全部歌单&nbsp;&nbsp;
              </div>
            </div>
          }
          content={
            <div className={style.popContent}>
              <div className={style.oneTagContent}>
                <div className={style.left}></div>
                <div className={style.right}></div>
              </div>
            </div>
          }
          trigger="click"
        >
          <div className={style.btn}>
            {selectTag.length > 0 ? selectTag : "全部歌单"}
            <RightOutlined></RightOutlined>
          </div>
        </Popover>
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
      <div className={style.songListContent}></div>
    </div>
  );
}
