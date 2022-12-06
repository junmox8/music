export default function timeFormat(number) {
  //number时间以秒为单位
  if (number === 0) return "00:00";
  if (number.length === 5) return number;
  var minute = parseInt(number / 60);
  var second = parseInt(number % 60);
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return minute + ":" + second;
}
export function changeTime(string) {
  return Number(string[0])*10*60+Number(string[1])*60+Number(string[3])*10+Number(string[4])
}
