import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useSearchParams } from "react-router-dom";
import { CaretRightFilled } from "@ant-design/icons";
import { searchWords } from "../../../axios/service/search";
import PlayAllMusic from "../../../utils/playAllMusic";
import { connect } from "react-redux";
import { Button, Pagination } from "antd";
import Song2 from "../../../components/song";
import PubSub from "pubsub-js";
function SearchPageSong(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const word = searchParams.get("words");
  useEffect(() => {
    setSongs([]);
    setCurrentPage(1);
    setSongCount(0);
    (async function () {
      PubSub.publish("setLoading", true);
      const result = await searchWords(word, 1, 100, 1);
      let arr = [];
      if (
        result.data.result.songs &&
        result.data.result.songs instanceof Array
      ) {
        result.data.result.songs.forEach((item) => {
          arr.push(false);
        });
        setSelect(arr);
      }
      setSongCount(result.data.result.songCount);
      setSongs(result.data.result.songs);
      PubSub.publish("setLoading", false);
    })();
  }, [word]);
  const [songs, setSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  const [isSelect, setSelect] = useState([]); //热门歌曲单击背景颜色改变
  const SingleClickHotSong = (index) => {
    let arr = [];
    for (let i = 0; i <= isSelect.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setSelect(arr);
  };
  const playAll = async () => {
    PlayAllMusic(songs, props.userInfo.isLogin, props.userInfo.vip);
  };
  const changePageSize = async (page) => {
    setCurrentPage((p) => page);
    PubSub.publish("setLoading", true);
    const result = await searchWords(word, page, 100, 1);
    let arr = [];
    if (result.data.result.songs && result.data.result.songs instanceof Array) {
      result.data.result.songs.forEach((item) => {
        arr.push(false);
      });
      setSelect(arr);
    }
    setSongs(result.data.result.songs);
    PubSub.publish("setLoading", false);
  };
  return (
    <div className={style.main}>
      <div className={style.topText}>找到{songCount}首单曲</div>
      <div className={style.btnContent}>
        <Button
          style={{
            backgroundColor: "#EC4141",
            border: "1px solid #EC4141",
          }}
          type="primary"
          shape="round"
          icon={<CaretRightFilled />}
          onClick={playAll}
        >
          播放全部
        </Button>
        {/* <Button
              style={{
                backgroundColor: "transparent",
                border: "1px solid #D9D9D9",
                marginLeft: "10px",
                color: "#373737",
              }}
              type="primary"
              shape="round"
              icon={<FileAddOutlined />}
            >
              收藏({dealWithCount(textInfo.subscribedCount)})
            </Button> */}
      </div>
      <div className={style.textLine}>
        <span style={{ left: "100px" }}>音乐标题</span>
        <span style={{ left: "45%" }}>歌手</span>
        <span style={{ left: "65%" }}>专辑</span>
        <span style={{ right: "30px" }}>时长</span>
      </div>
      <div className={style.songs}>
        {songs.map((item, index) => {
          return (
            <Song2
              c={SingleClickHotSong}
              key={index}
              name={item.name}
              engName={item.alia.length > 0 ? item.alia[0] : ""}
              index={index + (currentPage - 1) * 100}
              id={item.id}
              fee={item.fee} //会员非会员区别
              time={item.dt}
              isSelect={isSelect[index]}
              singer={JSON.stringify(item.ar)}
              album={JSON.stringify(item.al)}
              word={word}
              type={1}
            ></Song2>
          );
        })}
      </div>
      <div className={style.pageContent}>
        <Pagination
          pageSize={100}
          showSizeChanger={false}
          total={songCount}
          onChange={changePageSize}
          current={currentPage}
        />
      </div>
    </div>
  );
}
const a = (state) => {
  return {
    userInfo: state.userInfo,
  };
};
const b = null;
export default connect(a, b)(SearchPageSong);
