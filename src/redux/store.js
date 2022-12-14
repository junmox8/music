import { combineReducers, createStore } from "redux";
import songsArr from "./reducers/songsArr";
import loading from "./reducers/loading";
import loadingType from "./reducers/loadingType";
import userInfo from "./reducers/userInfo";
import userLikeMusic from "./reducers/userLikeMusic";
import musicPlaying from "./reducers/musicPlaying";
import playState from "./reducers/playState";
import { persistReducer, persistStore } from "redux-persist"; //持久化
import storage from "redux-persist/lib/storage";

const persitConfig = {
  key: "root",
  storage: storage,
  blacklist: ["loading", "loadingType", "musicPlaying", "playState"],
  // 如果不想将部分state持久化，可以将其放入黑名单(blacklist)中.黑名单是设置
  //   blacklist: ['ll']
};
const reducer = combineReducers({
  songsArr,
  loading,
  loadingType,
  userInfo,
  userLikeMusic,
  musicPlaying,
  playState,
});

const persist_reducers = persistReducer(persitConfig, reducer);
const store = createStore(persist_reducers);
const persistor = persistStore(store);

export { store, persistor };
