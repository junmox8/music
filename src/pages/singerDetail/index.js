import React, { useEffect, useState } from "react";
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
import style from "./index.module.scss";
function SingerDetail(props) {
  useEffect(() => {
    (async function () {
      if (props.loginState === true) {
        const {
          data: { data },
        } = await findOutUserCollection();
        let end = data.some((item) => {
          return item.id == singerId;
        });
        setState(end);
      }
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
    zhuanjiCount: 0,
    MVCount: 0,
  });
  const [collectionState, setState] = useState(false); //用户收藏状态
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
        break;
    }
  };
  return (
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
      </div>
    </div>
  );
}
const a = (state) => {
  return {
    loginState: state.loginType,
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
