import React from "react";
import { useLocation } from "react-router-dom";
import SingerTextDetail from "../../../components/singerTextDetail";
export default function AlbumInfo() {
  const location = useLocation();
  return (
    <div>
      <SingerTextDetail
        title="专辑介绍"
        content={location.state.description}
      ></SingerTextDetail>
    </div>
  );
}
