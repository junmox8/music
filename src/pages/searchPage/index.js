import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import searchRouterArr from "../../json/searchRouterArr";
import style from "./index.module.scss";
export default function SearchPage() {
  useEffect(() => {
    let arr = [];
    searchRouterArr.forEach((item, index) => {
      arr.push(index === 0 ? true : false);
    });
    setClickArr(arr);
    navigate(searchRouterArr[0].path + "?words=" + words, {
      replace: true,
    });
  }, []);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const words = searchParams.get("words");
  const [clickArr, setClickArr] = useState([]); //判断有没有点击路由
  const click = (index) => {
    let arr = [];
    for (let i = 0; i <= clickArr.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setClickArr(arr);
    navigate(searchRouterArr[index].path + "?words=" + words);
  };
  return (
    <div className={style.main}>
      <div className={style.searchWord}>搜索 {words}</div>
      <div className={style.routerLine}>
        {searchRouterArr.map((item, index) => {
          return (
            <div
              className={`
            ${clickArr[index] === true ? style.clickLink : ""}`}
              onClick={() => click(index)}
              key={index}
            >
              {item.name}
              <div
                className={style.redLine}
                style={{ display: clickArr[index] === true ? "block" : "none" }}
              ></div>
            </div>
          );
        })}
      </div>
      <div className={style.content}>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
