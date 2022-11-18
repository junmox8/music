import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";
import {
  getBanner,
  getSongList,
  getNewestMusic,
} from "../../../axios/service/recommand";
import { Carousel, Skeleton } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import SonglistSkeleton from "../../../components/Skeleton/songlist/songlist";
import Songlist from "../../../components/songlist";
import NewestSongSkeleton from "../../../components/Skeleton/newestSong";
import NewestSong from "../../../components/newestSong";
export default function Recommand() {
  useEffect(() => {
    (async function () {
      const {
        data: { banners },
      } = await getBanner();
      setBannerArr(banners);
      const {
        data: { recommend },
      } = await getSongList();
      setSongListArr(recommend);
      const {
        data: { result },
      } = await getNewestMusic();
      console.log(result);
      // setNewestSongArr(result);
    })();
  }, []);
  const carousel = useRef();
  const [bannerArr, setBannerArr] = useState([]);
  const [songListArr, setSongListArr] = useState([]); //歌单数组
  const [newestSongArr, setNewestSongArr] = useState([]); //最新歌曲数组
  const [bannerIndex, setIndex] = useState(0); //轮播图当前所在页数
  return (
    <div className={style.main}>
      <div className={style.bannerArea}>
        <img
          className={style.blurImg}
          style={{ display: bannerArr.length > 0 ? "block" : "none" }}
          src={bannerArr.length > 0 ? bannerArr[bannerIndex].imageUrl : ""}
        ></img>
        <div className={style.bannerBox}>
          <div
            className={style.arrowBox}
            onClick={() => {
              carousel.current.prev();
            }}
          >
            <LeftOutlined style={{ fontSize: "28px" }} />
          </div>
          <div
            className={style.arrowBox}
            onClick={() => {
              carousel.current.next();
            }}
          >
            <RightOutlined style={{ fontSize: "28px" }} />
          </div>
          <Carousel
            ref={carousel}
            className={style.carousel}
            autoplay
            beforeChange={(from, to) => {
              setIndex((i) => to);
            }}
          >
            {bannerArr.map((item, index) => {
              return (
                <div key={index}>
                  <img
                    className={style.img}
                    key={index}
                    src={item.imageUrl}
                  ></img>
                </div>
              );
            })}
          </Carousel>
        </div>
        <Skeleton.Image
          style={{
            width: "100%",
            height: "300px",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: "100",
            display: bannerArr.length === 0 ? "block" : "none",
            textAlign: "center",
            lineHeight: "300px",
          }}
          active={true}
        />
      </div>
      <div className={style.songListArea}>
        <div className={style.getSongListText}>推荐歌单</div>
        <div className={style.songlists}>
          <div
            style={{ display: songListArr.length === 0 ? "flex" : "none" }}
            className={style.songlistLine}
          >
            {[1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
              return <SonglistSkeleton key={index}></SonglistSkeleton>;
            })}
          </div>
          <div
            style={{ display: songListArr.length === 0 ? "none" : "flex" }}
            className={style.songlistLine}
          >
            {songListArr.map((item, index) => {
              return (
                <Songlist
                  key={index}
                  imgUrl={item.picUrl}
                  playCount={item.playcount}
                  name={item.name}
                  id={item.id}
                ></Songlist>
              );
            })}
          </div>
        </div>
      </div>
      <div className={style.newestSongArea}>
        <div className={style.newestSongText}>最新音乐</div>
        <div className={style.newestSongList}>
          <div
            style={{ display: newestSongArr.length === 0 ? "flex" : "none" }}
            className={style.newestSongLine}
          >
            {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
              return <NewestSongSkeleton key={index}></NewestSongSkeleton>;
            })}
          </div>
          <div
            style={{ display: newestSongArr.length === 0 ? "none" : "flex" }}
            className={style.newestSongLine}
          >
            {newestSongArr.map((item, index) => {
              return (
                <NewestSong
                  key={index}
                  imgUrl={item.picUrl}
                  playCount={item.playcount}
                  name={item.name}
                  id={item.id}
                ></NewestSong>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
