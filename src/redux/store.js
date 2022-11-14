import { combineReducers, createStore } from "redux";
import isLogin from "./reducers/login";
const reducer = combineReducers({
  isLogin,
});
export default createStore(reducer);
