import React, { useState, useEffect, useRef } from "react";
import { getSongListTag } from "../../../axios/service/songlist";
import SonglistPageTitle from "../../../components/songListPageTitle";
import style from "./index.module.scss";
export default function Songlist() {
  useEffect(() => {
    (async function () {
      const result = await getSongListTag();
      console.log(result);
    })();
  }, []);
  return (
    <div className={style.main}>
      <SonglistPageTitle></SonglistPageTitle>
    </div>
  );
}
