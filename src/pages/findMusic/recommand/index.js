import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";
import { getBanner } from "../../../axios/service/recommand";
import { Carousel, Skeleton } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
export default function Recommand() {
  useEffect(() => {
    (async function () {
      const {
        data: { banners },
      } = await getBanner();
      setBannerArr(banners);
    })();
  }, []);
  const carousel = useRef();
  const [bannerArr, setBannerArr] = useState([]);
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
                <div>
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
            zIndex: "10000",
            display: bannerArr.length === 0 ? "block" : "none",
            textAlign: "center",
            lineHeight: "300px",
          }}
          active={true}
        />
      </div>
    </div>
  );
}
