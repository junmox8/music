//播放整个歌单歌曲
//此方法用于上/下一首播放歌曲 不会使位置改变
//默认不判断歌曲版权
import { checkMusic } from "../axios/service/music";
import { message } from "antd";
import timeFormat from "./songTimeChange";
import pubsub from "pubsub-js";
export default async function PlayAllMusic(arr, isLogin) {
  let songArr = [];
  arr.forEach((item) => {
    //初步过滤数组(会员非会员)
    if (
      (isLogin === false && (item.fee === 0 || item.fee === 8)) ||
      isLogin === true
    ) {
      let str = "";
      item.ar.map((i, index) => {
        if (index === item.ar.length - 1) str += i.name;
        else str += i.name + "/";
      });
      let obj = {
        id: item.id,
        time: timeFormat(item.dt / 1000),
        singer: str,
        name: item.name,
        img: item.al.picUrl,
      };
      songArr.push(obj);
    }
  });
  let endArr = [];
  songArr.forEach(async (item, index) => {
    const {
      data: { success },
    } = await checkMusic(item.id);
    if (success === true) endArr.push(item);
  });
  message.success("添加歌单成功,已自动为您去掉没有播放权限的歌曲");
  setTimeout(() => {
    pubsub.publish("playAllMusic", endArr);
  }, 500);
}
