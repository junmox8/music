export default function dataChange(str) {
  let oDate = new Date(str),
    oYear = oDate.getFullYear(),
    oMonth = oDate.getMonth() + 1,
    oDay = oDate.getDate(),
    oHour = oDate.getHours(),
    oMin = oDate.getMinutes(),
    oSen = oDate.getSeconds(),
    oTime =
      oYear +
      "-" +
      addZero(oMonth) +
      "-" +
      addZero(oDay) +
      " " +
      addZero(oHour) +
      ":" +
      addZero(oMin) +
      ":" +
      addZero(oSen);
  return oTime;
}
function addZero(num) {
  if (parseInt(num) < 10) {
    num = "0" + num;
  }
  return num;
}
