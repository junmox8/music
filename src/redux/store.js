import { combineReducers, createStore } from "redux";
import songsArr from "./reducers/songsArr";
import loading from "./reducers/loading";
import loginType from "./reducers/loginType";
import loadingType from "./reducers/loadingType";
const reducer = combineReducers({
  songsArr,
  loading,
  loadingType,
  loginType,
});
export default createStore(reducer);
