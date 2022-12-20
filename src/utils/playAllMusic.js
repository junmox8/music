//播放整个歌单歌曲
//此方法用于上/下一首播放歌曲 不会使位置改变
//默认不判断歌曲版权
//使用promise.all保证歌曲数组发请求判断是否有权限 保证按顺序返回结果 不会出现歌曲数组乱序现象
import { checkMusic } from "../axios/service/music";
import { message } from "antd";
import timeFormat from "./songTimeChange";
import pubsub from "pubsub-js";
let hasDone = false; //变量记录有没有完成
export default async function PlayAllMusic(arr, isLogin, vip) {
  setTimeout(() => {
    if (hasDone === false) {
      message.error("网络较繁忙,请重试");
      pubsub.publish("setLoading", false);
    }
  }, 20000); //20秒后若还没有完成 则结束请求
  pubsub.publish("setLoading", true);
  let songArr = [];
  arr.forEach((item) => {
    //初步过滤数组(会员非会员)
    if (
      (isLogin === false && (item.fee === 0 || item.fee === 8)) ||
      (isLogin === true &&
        Number(vip) === 0 &&
        (item.fee === 0 || item.fee === 8)) ||
      (isLogin === true && Number(vip) !== 0 && item.fee !== 4)
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
          else resolve("失败"); //promise.all如果有一个失败 就会报错
        });
      })
    );
  });
  Promise.all(promiseArr).then((data) => {
    data = data.filter((item) => item !== "失败");
    hasDone = true;
    pubsub.publish("setLoading", false);
    message.success("添加歌单成功,已自动为您去掉没有播放权限的歌曲");

    setTimeout(() => {
      pubsub.publish("playAllMusic", data);
    }, 500);
  });
}
