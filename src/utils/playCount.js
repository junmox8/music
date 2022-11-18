//处理播放数量
export default function (n) {
  let end;
  let number = String(n);
  if (number.length < 5) end = number;
  if (number.length >= 5 && number.length <= 8)
    end = number.substring(0, number.length - 4) + "万";
  else end = number.substring(0, number.length - 8) + "亿";
  return end;
}
