export default function timeExchange(t) {
  const arr = t.split(":");
  return Number(arr[0]) * 60 + Number(arr[1]);
}
