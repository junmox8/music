import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";
import language from "../../../json/singer/language";
import kind from "../../../json/singer/type";
import SingerList from "../../../components/singer";
import initial from "../../../json/singer/initial";
import { getSingerList } from "../../../axios/service/singers";

let timeInterval = null;
export default function Singer() {
  async function scroll() {
    //节流
    if (!timeInterval) {
      if (page.current.scrollHeight <= page.current.scrollTop + 1200) {
        timeInterval = setTimeout(() => {
          clearTimeout(timeInterval);
          timeInterval = null;
        }, 1000);
        setPage((page) => page + 1);
      }
    }
  }
  useEffect(() => {
    (async function () {
      const {
        data: { artists },
      } = await getSingerList(1, selectTag3, selectTag1, selectTag2);
      setList(artists);
    })();
    page.current.addEventListener("scroll", scroll);
    return function () {
      if (page.current) page.current.removeEventListener("scroll", scroll);
    };
  }, []);

  const [currentPage, setPage] = useState(1); //当前页数
  const [selectTag1, setTag1] = useState("-1");
  const [selectTag2, setTag2] = useState("-1");
  const [selectTag3, setTag3] = useState("热门");
  useEffect(() => {
    (async function () {
      if (currentPage !== 1) {
        const {
          data: { artists },
        } = await getSingerList(
          currentPage + 1,
          selectTag3,
          selectTag1,
          selectTag2
        );
        setList((list) => [...list, ...artists]);
      }
    })();
  }, [currentPage]);
  useEffect(() => {
    (async function () {
      setList((a) => []);
      const {
        data: { artists },
      } = await getSingerList(1, selectTag3, selectTag1, selectTag2);
      setList(artists);
    })();
  }, [selectTag1, selectTag2, selectTag3]);
  const [singerList, setList] = useState([]);
  const page = useRef();
  const select = (value, id) => {
    if (id === 1) setTag1(value);
    if (id === 2) setTag2(value);
    if (id === 3) setTag3(value);
  };

  return (
    <div className={style.main} ref={page}>
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
      <div className={style.singersContainer}>
        {singerList.map((item, index) => {
          return (
            <SingerList
              img={item.picUrl}
              id={item.id}
              name={item.name}
              key={index}
            ></SingerList>
          );
        })}
      </div>
    </div>
  );
}
