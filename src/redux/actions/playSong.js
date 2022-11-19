//播放歌曲
export const song = (value) => {
  return {
    type: "playSong",
    data: value,
  };
};
