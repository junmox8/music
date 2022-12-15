//此方法会使歌曲位置发生改变 单首歌unshift进歌曲数组里
//播放单首歌曲
import { message } from "antd";
import {
  checkMusic,
  getMusicUrl,
  getMusicDetail,
} from "../axios/service/music";
import pubsub from "pubsub-js";
//type为0表示更改歌曲在列表顺序 1为不更改
export default async function playMusic(id, type = 0) {
  const {
    data: { success },
  } = await checkMusic(id);
  if (success === true) {
    const {
      data: { code, data: music },
    } = await getMusicUrl(id);
    if (code === 200) {
      const {
        data: { songs },
      } = await getMusicDetail(id);
      pubsub.publish("musicInfo", {
        songUrl: music[0].url,
        name: songs[0].name,
        time: songs[0].dt,
        singers: JSON.stringify(songs[0].ar),
        img: songs[0].al.picUrl,
        id,
        type,
        playingId: sessionStorage.getItem("playingId"),
        local: localStorage.getItem("persist:root"),
      });
      //后续加入播放列表的操作记得补上
    } else message.error("获取歌曲链接失败");
  } else message.error("对不起,该音乐暂无版权");
}
