//播放歌曲
export const setSongsArr = (value) => {
  return {
    type: "setSongsArr",
    data: value,
  };
};
export const addSongToArr = (value) => {
  return {
    type: "addSongToArr",
    data: value,
  };
};
