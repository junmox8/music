import React, { useState, useEffect, useRef } from "react";
import { getSongListTag } from "../../../axios/service/songlist";
import { RightOutlined } from "@ant-design/icons";
import { Popover, Skeleton, Pagination } from "antd";
import {
  GlobalOutlined,
  ProjectOutlined,
  CoffeeOutlined,
  SmileOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import { getImg, getListSongs } from "../../../axios/service/songlist";
import SonglistSkeleton2 from "../../../components/Skeleton/songList2";
import SonglistPageTitle from "../../../components/songListPageTitle";
import Songlist2 from "../../../components/songlist2";
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
      const {
        data: { playlists },
      } = await getImg("全部", 1);
      setTitleInfo({
        img: playlists[0].coverImgUrl,
        name: playlists[0].name,
      });
      const result = await getListSongs(100, 1, "全部");
      setNumber(result.data.total);
      setArr(result.data.playlists);
    })();
  }, []);
  useEffect(() => {
    page.current.addEventListener("scroll", scroll);
    return function () {
      if (page.current) page.current.removeEventListener("scroll", scroll);
    };
  }, []);
  const [selectTag, setTag] = useState("");
  const [tagCategories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [listArr, setArr] = useState([]); //歌单数组
  const [listNumber, setNumber] = useState(0); //该标签对应歌单数量
  const [noTitle, setTitle] = useState(false); //用于加载完成 但是标签没有对应封面
  const [titleInfo, setTitleInfo] = useState({
    img: "",
    name: "",
  });
  const page = useRef();
  const listRef = []; //歌单数组ref
  const select = async (name) => {
    setArr([]); //清空歌单数组
    setTitleInfo({
      img: "",
      name: "",
    }); //清空封面
    setTag(name);
    const {
      data: { playlists },
    } = await getImg(name, 1);
    if (playlists.length > 0) {
      setTitle((value) => false);
      setTitleInfo({
        img: playlists[0].coverImgUrl,
        name: playlists[0].name,
      });
    } else setTitle(true);
    const result = await getListSongs(100, 1, name);
    setNumber(result.data.total);
    setArr(result.data.playlists);
  };
  const changePageSize = async (v) => {
    const result = await getListSongs(100, v, selectTag);
    setArr((value) => []);
    setTimeout(() => {
      setNumber(result.data.total);
      setArr(result.data.playlists);
    }, 0);
  };
  function scroll() {
    console.log(1);
  }
  return (
    <div className={style.main} ref={page}>
      <SonglistPageTitle
        display={titleInfo.img.length >= 1 ? true : false}
        img={titleInfo.img}
        name={titleInfo.name}
      ></SonglistPageTitle>
      <div
        style={{
          width: "100%",
          height: "180px",
          position: "relative",
          display:
            titleInfo.img.length >= 1 || noTitle === true ? "none" : "block",
        }}
      >
        <Skeleton.Image
          style={{
            width: "80%",
            height: "180px",
            position: "absolute",
            top: 0,
            left: "10%",
            zIndex: "100",
            textAlign: "center",
            lineHeight: "180px",
            display:
              titleInfo.img.length >= 1 || noTitle === true ? "none" : "block",
          }}
          active={true}
        />
      </div>
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
              display={listArr.length > 0 ? "none" : "block"}
            ></SonglistSkeleton2>
          );
        })}
        {listArr.map((item, index) => {
          return (
            <Songlist2
              id={item.id}
              name={item.name}
              imgUrl={item.coverImgUrl}
              playCount={item.playCount}
              avatar={item.creator.avatarUrl}
              creatorName={item.creator.nickname}
              icon={item.creator.avatarDetail?.identityIconUrl || ""}
              ref={(r) => listRef.push(r)}
              key={index}
            ></Songlist2>
          );
        })}
      </div>
      <div className={style.lastContent}>
        <Pagination
          defaultCurrent={1}
          pageSize={100}
          showSizeChanger={false}
          total={listNumber}
          onChange={changePageSize}
        />
      </div>
    </div>
  );
}
