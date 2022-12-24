import React, { useState, useEffect } from "react";
import { getAlbumConment } from "../../../axios/service/album";
import { useSearchParams, useLocation } from "react-router-dom";
import PubSub from "pubsub-js";
import { Pagination } from "antd";
import Comment2 from "../../../components/comment/index";
import style from "./index.module.scss";
export default function AlbumComment(props) {
  useEffect(() => {
    (async function () {
      const {
        data: { comments },
      } = await getAlbumConment(id, 1);
      setCommentArr(comments);
    })();
  }, []);
  const [commentArr, setCommentArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const location = useLocation();
  const changePage = async (page) => {
    PubSub.publish("setLoading", true);
    const {
      data: { comments },
    } = await getAlbumConment(id, page);
    setCommentArr(comments);
    PubSub.publish("setLoading", false);
  };
  return (
    <div className={style.main}>
      <div className={style.commentContent}>
        {commentArr.map((item, index) => {
          return (
            <Comment2
              key={index}
              userName={item.user.nickname}
              avatarUrl={item.user.avatarUrl}
              bottomIcon={
                item.user.avatarDetail
                  ? item.user.avatarDetail.identityIconUrl
                  : null
              }
              rightIcon={
                item.user.vipRights && item.user.vipRights.associator
                  ? item.user.vipRights.associator.iconUrl
                  : null
              }
              time={item.timeStr}
              content={item.content}
              id={item.commentId}
              replyUsername={
                item.beReplied &&
                item.beReplied.length &&
                item.beReplied.length > 0
                  ? item.beReplied[0].user.nickname
                  : ""
              }
              replyContent={
                item.beReplied &&
                item.beReplied.length &&
                item.beReplied.length > 0
                  ? item.beReplied[0].content
                  : ""
              }
            ></Comment2>
          );
        })}
      </div>
      <div className={style.paginationContent}>
        <Pagination
          defaultCurrent={1}
          total={location.state.commentCount}
          pageSize={50}
          showSizeChanger={false}
          onChange={changePage}
        />
      </div>
    </div>
  );
}
