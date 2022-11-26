import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getRank } from "../../../axios/service/rank";
import RankComponent from "../../../components/rank";
import SonglistSkeleton2 from "../../../components/Skeleton/songList2";
import QuanqiuRank from "../../../components/rank/quanqiuRank";
import OfficalRank from "../../../components/Skeleton/OfficalRank";
export default function Rank() {
  useEffect(() => {
    (async function () {
      const {
        data: { list },
      } = await getRank();
      setRank1(list.slice(0, 4));
      setRank2(list.slice(4, list.length));
    })();
  }, []);
  const [rank1, setRank1] = useState([]); //前四个榜单
  const [rank2, setRank2] = useState([]); //后面几十个榜单
  return (
    <div className={style.main}>
      <div className={style.guanfang}>
        <div className={style.titleText}>官方榜</div>
        {[1, 1, 1, 1].map((item, index) => {
          return (
            <OfficalRank
              display={rank1.length > 0 ? "none" : "flex"}
              key={index}
            ></OfficalRank>
          );
        })}
        {rank1.map((item, index) => {
          return (
            <RankComponent
              key={index}
              name={item.name}
              time={item.updateFrequency}
              img={item.coverImgUrl}
              id={item.id}
            ></RankComponent>
          );
        })}
      </div>
      <div className={style.quanqiu}>
        <div className={style.titleText}>全球榜</div>
        <div className={style.content}>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
            return (
              <SonglistSkeleton2
                display={rank2.length > 0 ? "none" : "block"}
                key={index}
              ></SonglistSkeleton2>
            );
          })}
          {rank2.map((item, index) => {
            return (
              <QuanqiuRank
                id={item.id}
                name={item.name}
                playCount={item.playCount}
                img={item.coverImgUrl}
                key={index}
              ></QuanqiuRank>
            );
          })}
        </div>
      </div>
    </div>
  );
}
