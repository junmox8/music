import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  getSingerDesc,
  getSingerDetail,
  findOutUserCollection,
  collectSingerOrNot,
} from "../../axios/service/singers";
import { useSearchParams } from "react-router-dom";
import { FileAddOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { connect } from "react-redux";
import routerArr from "../../json/singerRouterArr";
import style from "./index.module.scss";
function SingerDetail(props) {
  useEffect(() => {
    (async function () {
      if (props.userInfo.isLogin === true) {
        const {
          data: { data },
        } = await findOutUserCollection();
        let end = data.some((item) => {
          return item.id == singerId;
        });
        console.log(end);
        setState(end);
      }
      let arr = [];
      routerArr.forEach((item, index) => {
        arr.push(index === 0 ? true : false);
      });
      setClickArr(arr);
      navigate(routerArr[0].path + "?id=" + singerId, { replace: true });
      const {
        data: {
          data: { artist, identify },
        },
      } = await getSingerDetail(singerId);
      setInfo({
        name: artist.name,
        identify: identify.imageDesc,
        img: artist.cover,
        songCount: artist.musicSize,
        zhuanjiCount: artist.albumSize,
        MVCount: artist.mvSize,
      });
    })();
  }, []);
  const [params, setParams] = useSearchParams();
  const singerId = params.get("id");
  const [singerInfo, setInfo] = useState({
    name: "",
    identify: "",
    img: "",
    songCount: 0,
    MVCount: 0,
  });
  const [collectionState, setState] = useState(false); //用户收藏状态
  const navigate = useNavigate();
  const [clickArr, setClickArr] = useState([]); //判断有没有点击路由
  const collectSinger = async (type) => {
    if (props.loginState === false) return message.error("请先登录");
    switch (type) {
      case true: //添加收藏
        props.setLoading(true);
        props.setLoadingType(1);
        const { data } = await collectSingerOrNot(singerId, 1);
        if (data.code === 200) {
          message.success("收藏歌手成功");
          props.setLoading(false);
          setState(true);
        }
        break;
      case false: //取消收藏
        props.setLoading(true);
        props.setLoadingType(1);
        const {
          data: { message: messag },
        } = await collectSingerOrNot(singerId, 23);
        if (messag === "success") {
          message.success("取消收藏成功");
          props.setLoading(false);
          setState(false);
        } else message.error("取消收藏失败");
        break;
    }
  };
  const click = (index) => {
    let arr = [];
    for (let i = 0; i <= clickArr.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setClickArr(arr);
    navigate(routerArr[index].path + "?id=" + singerId);
  };
  return (
    <div className={style.main}>
      <div className={style.singerDetail}>
        <div
          className={style.coverImg}
          style={{
            backgroundImage: `url(${singerInfo.img})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className={style.textInfo}>
          <div className={style.name}>{singerInfo.name}</div>
          <div className={style.identify}>{singerInfo.identify}</div>
          <Button
            className={style.button}
            type="primary"
            shape="round"
            icon={<FileAddOutlined />}
            onClick={() => collectSinger(true)}
            style={{ display: collectionState === false ? "block" : "none" }}
          >
            添加收藏
          </Button>
          <Button
            className={style.button}
            type="primary"
            shape="round"
            icon={<FileExcelOutlined />}
            onClick={() => collectSinger(false)}
            style={{ display: collectionState === true ? "block" : "none" }}
          >
            取消收藏
          </Button>
          <div className={style.numberContent}>
            <div>单曲数:{singerInfo.songCount}</div>
            <div>专辑数:{singerInfo.zhuanjiCount}</div>
            <div>MV数:{singerInfo.MVCount}</div>
          </div>
        </div>
      </div>
      <div className={style.routerLine}>
        {routerArr.map((item, index) => {
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
    setLoading: (value) => dispatch({ type: "setLoading", data: value }),
    setLoadingType: (value) =>
      dispatch({ type: "setLoadingType", data: value }),
  };
};
export default connect(a, b)(SingerDetail);
