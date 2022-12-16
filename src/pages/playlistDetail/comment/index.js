import React, { useState, useEffect } from "react";
import { getSongListComment } from "../../../axios/service/songlist";
import { useSearchParams } from "react-router-dom";
import Comment2 from "../../../components/comment/index";
import style from "./index.module.scss";
export default function Comment(props) {
  useEffect(() => {
    (async function () {
      const {
        data: { comments },
      } = await getSongListComment(id, 1);
      console.log(comments);
      setCommentArr(comments);
    })();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentArr, setCommentArr] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
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
            ></Comment2>
          );
        })}
      </div>
    </div>
  );
}
