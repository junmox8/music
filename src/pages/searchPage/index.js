import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import searchRouterArr from "../../json/searchRouterArr";
import PubSub from "pubsub-js";
import { connect } from "react-redux";
import { getUserLikeMusics } from "../../axios/service/music";
import style from "./index.module.scss";
function SearchPage(props) {
  useEffect(() => {
    PubSub.subscribe("initPage", (_, v) => {
      //在搜索页面初始化路由文字样式(红色部分)
      let arr = [];
      searchRouterArr.forEach((item, index) => {
        arr.push(index === 0 ? true : false);
      });
      setClickArr(arr);
    });
    (async function () {
      let arr = [];
      searchRouterArr.forEach((item, index) => {
        arr.push(index === 0 ? true : false);
      });
      setClickArr(arr);
      navigate(searchRouterArr[0].path + "?words=" + words, {
        replace: true,
      });
      if (props.userInfo.isLogin === true) {
        const {
          data: { ids },
        } = await getUserLikeMusics(props.userInfo.userId);
        props.setUserLikeMusic(ids);
      }
    })();
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
const a = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
const b = (dispatch) => {
  return {
    setUserLikeMusic: (value) =>
      dispatch({
        type: "setUserLikeMusic",
        data: value,
      }),
  };
};
export default connect(a, b)(SearchPage);
