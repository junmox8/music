import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useSearchParams } from "react-router-dom";
import { searchWords } from "../../../axios/service/search";
import PubSub from "pubsub-js";
export default function SearchPageSong() {
  useEffect(() => {}, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const word = searchParams.get("words");
  useEffect(() => {
    PubSub.subscribe("search", async (_, words) => {
      PubSub.publish("setLoading", true);
      const result = await searchWords(words, 1, 100, 1);
      setSongCount(result.data.result.songCount);
      setSongs(result.data.result.songs);
      PubSub.publish("setLoading", false);
    });
  }, []);

  const [songs, setSongs] = useState([]);
  const [songCount, setSongCount] = useState(0);
  return (
    <div className={style.main}>
      <div className={style.topText}>找到{songCount}首单曲</div>
    </div>
  );
}
