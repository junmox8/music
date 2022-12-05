import { message } from "antd";
import {
  checkMusic,
  getMusicUrl,
  getMusicDetail,
} from "../axios/service/music";
import pubsub from "pubsub-js";
export default async function playMusic(id) {
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
      });
      //后续加入播放列表的操作记得补上
    } else message.error("获取歌曲链接失败");
  } else message.error("对不起,该音乐暂无版权");
}
