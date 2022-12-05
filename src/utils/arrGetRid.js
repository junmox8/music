//数组去重

export default function arrGetRid(arr) {
  let endArr = [];
  arr.forEach((item) => {
    if (!endArr.some((i) => i.id == item.id)) endArr.push(item);
  });
  return endArr;
}
