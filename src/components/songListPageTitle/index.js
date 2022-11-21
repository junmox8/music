import React from "react";
import style from "./index.module.scss";
import { CrownOutlined } from "@ant-design/icons";
import { Space } from "antd";
export default function SonglistPageTitle() {
  return (
    <div className={style.main}>
      <div
        className={style.bgi}
        style={{
          backgroundImage: `url('https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1669017357232')`,
        }}
      ></div>
      <div className={style.contentBox}>
        <img
          src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1669017357232"
          style={{ height: "80%" }}
        ></img>
        <div className={style.textBox}>
          <div className={style.btn}>
            <CrownOutlined></CrownOutlined>
            <div style={{ marginLeft: "5px" }}>精品歌单</div>
          </div>
          <div className={style.name}>流光美人,香港电影十二钗</div>
        </div>
      </div>
    </div>
  );
}
