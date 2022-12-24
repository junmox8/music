import React, { useState, useEffect } from "react";
import { getSingerDesc } from "../../../axios/service/singers";
import { useSearchParams } from "react-router-dom";
import SingerTextDetail from "../../../components/singerTextDetail";
import style from "./index.module.scss";
export default function Detail(props) {
  useEffect(() => {
    (async function () {
      const result = await getSingerDesc(singerId);
      setArr(result.data.introduction);
      setIntroduction({
        title: "简介",
        content: result.data.briefDesc,
      });
    })();
  }, []);
  const [getParmas, setParmas] = useSearchParams();
  const singerId = getParmas.get("id");
  const [introduction, setIntroduction] = useState({
    title: "",
    content: "",
  });
  const [textArr, setArr] = useState([]);
  return (
    <div className={style.main}>
      <SingerTextDetail
        title={introduction.title}
        content={introduction.content}
      ></SingerTextDetail>
      {textArr.map((item, index) => {
        return (
          <SingerTextDetail
            key={index}
            title={item.ti}
            content={item.txt}
          ></SingerTextDetail>
        );
      })}
    </div>
  );
}
