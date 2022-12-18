//播放整个歌单歌曲
//此方法用于上/下一首播放歌曲 不会使位置改变
//默认不判断歌曲版权
//使用promise.all保证歌曲数组发请求判断是否有权限 保证按顺序返回结果 不会出现歌曲数组乱序现象
import { checkMusic } from "../axios/service/music";
import { message } from "antd";
import timeFormat from "./songTimeChange";
import pubsub from "pubsub-js";
export default async function PlayAllMusic(arr, isLogin) {
  pubsub.publish("setLoading", true);
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
  let promiseArr = [];
  songArr.forEach((item) => {
    promiseArr.push(
      new Promise((resolve, reject) => {
        checkMusic(item.id).then((result) => {
          if (result.data.success === true) resolve(item);
          else reject("失败");
        });
      })
    );
  });
  Promise.all(promiseArr).then((data) => {
    pubsub.publish("setLoading", false);
    message.success("添加歌单成功,已自动为您去掉没有播放权限的歌曲");

    setTimeout(() => {
      pubsub.publish("playAllMusic", data);
    }, 500);
  });
}
