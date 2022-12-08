import React, { useState, useEffect } from "react";
import { getSingerDesc } from "../../../axios/service/singers";
import { useSearchParams } from "react-router-dom";
import style from "./index.module.scss";
export default function Detail(props) {
  useEffect(() => {
    (async function () {
      const result = await getSingerDesc(singerId);
      console.log(result);
    })();
  }, []);
  const [getParmas, setParmas] = useSearchParams();
  const singerId = getParmas.get("id");
  return <div className={style.main}>index</div>;
}
