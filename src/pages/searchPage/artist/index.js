import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useSearchParams } from "react-router-dom";
import { searchWords } from "../../../axios/service/search";
import SearchPageArtistComponent from "../../../components/searchPageArtist";
import { Pagination } from "antd";
import PubSub from "pubsub-js";
export default function SearchPageArtist(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const word = searchParams.get("words");
  useEffect(() => {
    (async function () {
      PubSub.publish("setLoading", true);
      const result = await searchWords(word, 1, 20, 100);
      setArtistCount(result.data.result.artistCount);
      setArtists(result.data.result.artists);
      PubSub.publish("setLoading", false);
    })();
  }, []);
  const [artists, setArtists] = useState([]);
  const [artistCount, setArtistCount] = useState(0);
  const changePageSize = async (page) => {
    setCurrentPage((p) => page);
    PubSub.publish("setLoading", true);
    const result = await searchWords(word, page, 20, 100);
    setArtists(result.data.result.artists);
    PubSub.publish("setLoading", false);
  };
  return (
    <div className={style.main}>
      <div className={style.topText}>找到{artistCount}位歌手</div>
      <div className={style.artists}>
        {artists.map((item, index) => {
          return (
            <SearchPageArtistComponent
              key={index}
              id={item.id}
              name={item.name}
              name2={item.alias && item.alias.length > 0 ? item.alias[0] : ""}
              avatar={item.picUrl}
              icon={item.img1v1Url}
              index={index}
              word={word}
            ></SearchPageArtistComponent>
          );
        })}
      </div>
      <div className={style.pageContent}>
        <Pagination
          pageSize={20}
          showSizeChanger={false}
          total={artistCount}
          onChange={changePageSize}
          current={currentPage}
        />
      </div>
    </div>
  );
}
