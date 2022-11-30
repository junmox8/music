import React, { useEffect, useState } from "react";
import { getSingerDesc, getSingerDetail } from "../../axios/service/singers";
import { useSearchParams } from "react-router-dom";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { connect } from "react-redux";
import style from "./index.module.scss";
function SingerDetail(props) {
  useEffect(() => {
    (async function () {
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
  const collectSinger = () => {
    if (props.loginState === false) return message.error("请先登录");
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
          onClick={collectSinger}
        >
          添加收藏
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
  return {};
};
export default connect(a, b)(SingerDetail);
