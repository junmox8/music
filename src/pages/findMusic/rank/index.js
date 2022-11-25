import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getRank } from "../../../axios/service/rank";
import RankComponent from "../../../components/rank";
export default function Rank() {
  useEffect(() => {
    (async function () {
      const {
        data: { list },
      } = await getRank();
      setRank1(list.slice(0, 4));
    })();
  }, []);
  const [rank1, setRank1] = useState([]); //前四个榜单
  const [rank2, setRank2] = useState([]); //后面几十个榜单
  return (
    <div className={style.main}>
      <div className={style.guanfang}>
        <div className={style.titleText}>官方榜</div>
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
    </div>
  );
}
