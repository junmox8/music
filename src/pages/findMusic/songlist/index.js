import React, { useState, useEffect, useRef } from "react";
import { getSongListTag } from "../../../axios/service/songlist";
import { RightOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import {
  GlobalOutlined,
  ProjectOutlined,
  CoffeeOutlined,
  SmileOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import SonglistSkeleton2 from "../../../components/Skeleton/songList2";
import SonglistPageTitle from "../../../components/songListPageTitle";
import tagArr from "../../../json/songListTag";
import style from "./index.module.scss";
export default function Songlist() {
  useEffect(() => {
    (async function () {
      const {
        data: { sub, categories },
      } = await getSongListTag();
      let arr = [];
      Object.keys(categories).forEach((item) => {
        arr.push(categories[item]);
      });
      setCategories(arr);
      setTags(sub);
    })();
  }, []);
  const [selectTag, setTag] = useState("");
  const [tagCategories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [listArr, setArr] = useState([]); //歌单数组
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
              {tagCategories.map((item, index) => {
                return (
                  <div key={index} className={style.oneTagContent}>
                    <div className={style.left}>
                      <div className={style.categories}>
                        <GlobalOutlined
                          style={{ display: index === 0 ? "block" : "none" }}
                        ></GlobalOutlined>
                        <ProjectOutlined
                          style={{ display: index === 1 ? "block" : "none" }}
                        ></ProjectOutlined>
                        <CoffeeOutlined
                          style={{ display: index === 2 ? "block" : "none" }}
                        ></CoffeeOutlined>
                        <SmileOutlined
                          style={{ display: index === 3 ? "block" : "none" }}
                        ></SmileOutlined>
                        <CustomerServiceOutlined
                          style={{ display: index === 4 ? "block" : "none" }}
                        ></CustomerServiceOutlined>
                        {item}
                      </div>
                    </div>
                    <div className={style.right}>
                      {tags.map((item, ind) => {
                        return (
                          <div
                            style={{
                              display:
                                index == item.category ? "block" : "none",
                              color:
                                selectTag === item.name ? "#EC4141" : "#373737",
                              backgroundColor:
                                selectTag === item.name
                                  ? "#FEF5F5"
                                  : "transparent",
                            }}
                            onClick={() => select(item.name)}
                            key={ind}
                            className={style.tagInPop}
                          >
                            &nbsp;&nbsp;{item.name}&nbsp;&nbsp;
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
      <div className={style.songListContent}>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
          return (
            <SonglistSkeleton2
              key={index}
              style={{ display: listArr.length > 0 ? "none" : "block" }}
            ></SonglistSkeleton2>
          );
        })}
      </div>
    </div>
  );
}
