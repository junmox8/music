import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
export default function SingerTextDetail(props) {
  useEffect(() => {
    setArr(props.content.split(/[\n]/));
  }, []);
  const [txts, setArr] = useState([]);
  return (
    <div className={style.main}>
      <div className={style.title}>{props.title}</div>
      <div className={style.content}>
        {txts.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </div>
    </div>
  );
}
