import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { getBanner } from "../../../axios/service/recommand";
export default function Recommand() {
  useEffect(() => {
    (async function () {
      const result = await getBanner();
      console.log(result);
    })();
  }, []);
  const [bannerArr, setBannerArr] = useState([]);
  return (
    <div className={style.main}>
      <div className={style.bannerArea}></div>
    </div>
  );
}
