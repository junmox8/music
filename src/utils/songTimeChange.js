export default function timeFormat(number) {
  //number时间以秒为单位
  if (number === 0) return "00:00";
  var minute = parseInt(number / 60);
  var second = parseInt(number % 60);
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return minute + ":" + second;
}
