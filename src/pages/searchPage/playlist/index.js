import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { useSearchParams } from "react-router-dom";
import { searchWords } from "../../../axios/service/search";
import SearchPagePlaylistComponent from "../../../components/searchPagePlaylist";
import { Pagination } from "antd";
import PubSub from "pubsub-js";
export default function SearchPagePlaylist(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const word = searchParams.get("words");
  useEffect(() => {
    (async function () {
      PubSub.publish("setLoading", true);
      const result = await searchWords(word, 1, 20, 1000);
      console.log(result);
      setPlaylistCount(result.data.result.playlistCount);
      setPlaylist(result.data.result.playlists);
      PubSub.publish("setLoading", false);
    })();
  }, []);
  const [playlist, setPlaylist] = useState([]);
  const [playlistCount, setPlaylistCount] = useState(0);
  const changePageSize = async (page) => {
    setCurrentPage((p) => page);
    PubSub.publish("setLoading", true);
    const result = await searchWords(word, page, 20, 1000);
    setPlaylist(result.data.result.playlists);
    PubSub.publish("setLoading", false);
  };
  return (
    <div className={style.main}>
      <div className={style.topText}>找到{playlistCount}个歌单</div>
      <div className={style.playlist}>
        {playlist.map((item, index) => {
          return (
            <SearchPagePlaylistComponent
              key={index}
              name={item.name}
              index={index}
              id={item.id}
              playCount={item.playCount}
              img={item.coverImgUrl}
              songCount={item.trackCount}
              artistName={item.creator.nickname}
              artistId={item.creator.userId}
              word={word}
            ></SearchPagePlaylistComponent>
          );
        })}
      </div>
      <div className={style.pageContent}>
        <Pagination
          pageSize={20}
          showSizeChanger={false}
          total={playlistCount}
          onChange={changePageSize}
          current={currentPage}
        />
      </div>
    </div>
  );
}
