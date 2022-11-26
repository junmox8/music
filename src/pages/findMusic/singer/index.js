import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import language from "../../../json/singer/language";
import kind from "../../../json/singer/type";
import initial from "../../../json/singer/initial";
import { getSingerList } from "../../../axios/service/singers";
export default function Singer() {
  useEffect(() => {
    (async function () {
      const {
        data: { artists },
      } = await getSingerList(1, "热门", "-1", "-1");
      setList(artists);
    })();
  }, []);
  const [currentPage, setPage] = useState(1); //当前页数
  const [selectTag1, setTag1] = useState("-1");
  const [selectTag2, setTag2] = useState("-1");
  const [selectTag3, setTag3] = useState("热门");
  const [singerList, setList] = useState([]);
  const select = (value, id) => {
    if (id === 1) setTag1(value);
    if (id === 2) setTag2(value);
    if (id === 3) setTag3(value);
  };
  return (
    <div className={style.main}>
      <div className={style.popContent}>
        <div className={style.oneTagContent}>
          <div className={style.left}>
            <div className={style.categories}>语种:</div>
          </div>
          <div className={style.right}>
            {language.map((item, ind) => {
              return (
                <div
                  style={{
                    color: selectTag1 === item.value ? "#EC4141" : "#373737",
                    backgroundColor:
                      selectTag1 === item.value ? "#FEF5F5" : "transparent",
                  }}
                  onClick={() => select(item.value, 1)}
                  key={ind}
                  className={style.tagInPop}
                >
                  &nbsp;&nbsp;{item.name}&nbsp;&nbsp;
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.oneTagContent}>
          <div className={style.left}>
            <div className={style.categories}>分类:</div>
          </div>
          <div className={style.right}>
            {kind.map((item, ind) => {
              return (
                <div
                  style={{
                    color: selectTag2 === item.value ? "#EC4141" : "#373737",
                    backgroundColor:
                      selectTag2 === item.value ? "#FEF5F5" : "transparent",
                  }}
                  onClick={() => select(item.value, 2)}
                  key={ind}
                  className={style.tagInPop}
                >
                  &nbsp;&nbsp;{item.name}&nbsp;&nbsp;
                </div>
              );
            })}
          </div>
        </div>
        <div className={style.oneTagContent}>
          <div className={style.left}>
            <div className={style.categories}>筛选:</div>
          </div>
          <div className={style.right}>
            {initial.map((item, ind) => {
              return (
                <div
                  style={{
                    color: selectTag3 === item ? "#EC4141" : "#373737",
                    backgroundColor:
                      selectTag3 === item ? "#FEF5F5" : "transparent",
                  }}
                  onClick={() => select(item, 3)}
                  key={ind}
                  className={style.tagInPop}
                >
                  &nbsp;&nbsp;{item}&nbsp;&nbsp;
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={style.singersContainer}></div>
    </div>
  );
}
