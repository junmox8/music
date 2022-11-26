import { combineReducers, createStore } from "redux";
import setSongsArr from "./reducers/songsArr";
const reducer = combineReducers({
  setSongsArr,
});
export default createStore(reducer);
