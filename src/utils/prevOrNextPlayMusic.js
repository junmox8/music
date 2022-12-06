//此方法用于上/下一首播放歌曲 不会使位置改变
//默认不判断歌曲版权
import { message } from "antd";
import { getMusicUrl, getMusicDetail } from "../axios/service/music";
import pubsub from "pubsub-js";
export default async function PrevOrNextPlayMusic(id) {
  const {
    data: { code, data: music },
  } = await getMusicUrl(id);
  if (code === 200) {
    const {
      data: { songs },
    } = await getMusicDetail(id);
    pubsub.publish("prevOrNext", {
      songUrl: music[0].url,
      name: songs[0].name,
      time: songs[0].dt,
      singers: JSON.stringify(songs[0].ar),
      img: songs[0].al.picUrl,
      id,
    });
    //后续加入播放列表的操作记得补上
  } else message.error("获取歌曲链接失败");
}
