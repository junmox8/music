import { combineReducers, createStore } from "redux";
import playSong from "./reducers/playSong";
import setSongsArr from "./reducers/songsArr";
const reducer = combineReducers({
  playSong,
  setSongsArr,
});
export default createStore(reducer);
