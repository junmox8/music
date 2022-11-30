import { combineReducers, createStore } from "redux";
import songsArr from "./reducers/songsArr";
import loading from "./reducers/loading";
const reducer = combineReducers({
  songsArr,
  loading,
});
export default createStore(reducer);
