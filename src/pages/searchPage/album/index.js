import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useSearchParams } from "react-router-dom";
import { searchWords } from "../../../axios/service/search";
import SearchPageAlbumComponent from "../../../components/searchPageAlbum";
import { Pagination } from "antd";
import PubSub from "pubsub-js";
export default function SearchPageAlbum(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const word = searchParams.get("words");
  useEffect(() => {
    (async function () {
      PubSub.publish("setLoading", true);
      const result = await searchWords(word, 1, 20, 10);
      console.log(result);
      setAlbumCount(result.data.result.albumCount);
      setAlbums(result.data.result.albums);
      PubSub.publish("setLoading", false);
    })();
  }, []);
  const [albums, setAlbums] = useState([]);
  const [albumCount, setAlbumCount] = useState(0);
  const changePageSize = async (page) => {
    setCurrentPage((p) => page);
    PubSub.publish("setLoading", true);
    const result = await searchWords(word, page, 20, 10);
    setAlbums(result.data.result.albums);
    PubSub.publish("setLoading", false);
  };
  return (
    <div className={style.main}>
      <div className={style.topText}>找到{albumCount}张专辑</div>
      <div className={style.albums}>
        {albums.map((item, index) => {
          return (
            <SearchPageAlbumComponent
              key={index}
              word={word}
              img={item.picUrl}
              name={item.name}
              id={item.id}
              artistName={item.artist.name}
              artistName2={
                item.artist.alias && item.artist.alias.length > 0
                  ? item.artist.alias[0]
                  : ""
              }
            ></SearchPageAlbumComponent>
          );
        })}
      </div>
      <div className={style.pageContent}>
        <Pagination
          pageSize={20}
          showSizeChanger={false}
          total={albumCount}
          onChange={changePageSize}
          current={currentPage}
        />
      </div>
    </div>
  );
}
