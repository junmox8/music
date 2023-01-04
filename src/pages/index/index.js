import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";
import Loading from "../../components/loading/loginLoading";
import CollectSinger from "../../components/loading/collectSinger";
import Login from "../../components/login";
import MusicControl from "../../components/musicControl";
import SuggestWord from "../../components/suggestWord";
import {
  getHotSearchWords,
  getSearchSuggests,
} from "../../axios/service/search";
import PubSub from "pubsub-js";
import { Layout, Popover } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { loginByQr, createQr } from "../../axios/service/login";
import { PoweroffOutlined, SearchOutlined } from "@ant-design/icons";
import HotWord from "../../components/hotWord";
import routerArr from "../../json/routerArr";
import { connect } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
let timeInterval = null; //搜索防抖
let flag = false; //判断是否输入完毕 中文拼音问题
function Index(props) {
  useEffect(() => {
    navigate(routerArr[0].path, { replace: true });
    let arr = [];
    routerArr.forEach((item, index) => {
      arr.push(index === 0 ? true : false);
    });
    setClickArr(arr);
    PubSub.subscribe("setLoading", (_, data) => {
      props.setLoading(data);
    });
    (async function () {
      const {
        data: { data: result }, //获取热搜条目
      } = await getHotSearchWords();
      setHotWords(result);
    })();
  }, []);
  const navigate = useNavigate();
  const [clickArr, setClickArr] = useState([]); //判断有没有点击路由
  const [isLogin, setLogin] = useState(false); //控制登录界面显示
  const [isLoading, setLoading] = useState(false); //控制loading显示
  const [qrimg, setImgUrl] = useState(""); //二维码图片url
  const [qrkey, setQrKey] = useState(""); //二维码图片key
  const [value, setValue] = useState(""); //搜索框
  const [hotWords, setHotWords] = useState([]); //热搜词
  const [suggestAlbum, setSuggestAlbum] = useState([]); //搜索建议专辑
  const [suggestSong, setSuggestSong] = useState([]); //搜索建议单曲
  const [suggestSonglist, setSuggestSonglist] = useState([]); //搜索建议歌单
  const exitBox = useRef();
  const click = (index) => {
    let arr = [];
    for (let i = 0; i <= clickArr.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setClickArr(arr);
    navigate(routerArr[index].path);
  };
  const login = async () => {
    if (props.userInfo.isLogin === false) {
      setLoading(true);
      const {
        data: {
          data: { unikey: key },
        },
      } = await loginByQr();
      const {
        data: {
          data: { qrimg },
        },
      } = await createQr(key);
      setQrKey(key);
      setImgUrl(qrimg);
      setLoading(false);
      setLogin(true);
    }
  };
  const changeInput = async (e) => {
    setValue(e.target.value);
    if (e.target.value.length === 0) {
      setSuggestAlbum([]);
      setSuggestSong([]);
      setSuggestSonglist([]);
    }
    if (timeInterval == null && flag === true) {
      timeInterval = setTimeout(async () => {
        const result = await getSearchSuggests(e.target.value);
        if (result && result.data && result.data.result) {
          setSuggestAlbum(
            typeof result.data.result.albums != "undefined"
              ? result.data.result.albums
              : []
          );
          setSuggestSong(
            typeof result.data.result.songs != "undefined"
              ? result.data.result.songs
              : []
          );
          setSuggestSonglist(
            typeof result.data.result.playlists != "undefined"
              ? result.data.result.playlists
              : []
          );
        }
        clearTimeout(timeInterval);
        timeInterval = null;
      }, 500);
    } else {
      clearTimeout(timeInterval);
      timeInterval = null;
    }
  };
  function dealWithStr(item) {
    let str = "";
    item.artists.forEach((i, ind) => {
      if (ind !== item.artists.length - 1) str += i.name + "/";
      else str += i.name;
    });
    return str;
  }
  const search = function (e) {
    if (e.code === "Enter" && value.length !== 0) {
      navigate("/searchPage/song?words=" + value);
      PubSub.publish("initPage", 1); //在搜索页面初始化路由文字样式(红色部分)
    }
  };
  return (
    <div className={style.global}>
      <div
        className={style.loadingBox}
        style={{
          display:
            isLogin === true || isLoading === true || props.loading === true
              ? "block"
              : "none",
        }}
      >
        <div
          style={{
            display:
              isLogin === true || isLoading === true || props.loading === true
                ? "block"
                : "none",
          }}
          className={style.box}
        >
          <Login
            display={isLogin}
            qrimg={qrimg}
            qrkey={qrkey}
            closeBox={() => {
              setLogin(false);
            }}
          ></Login>
          <Loading display={isLoading}></Loading>
          <CollectSinger
            display={
              props.loading === true && props.loadingType === 1 ? true : false
            }
          ></CollectSinger>
        </div>
      </div>
      <Layout style={{ height: "100%" }}>
        <Header className={style.header}>
          <img
            style={{ cursor: "pointer", height: "64px" }}
            onClick={() => {
              navigate(routerArr[0].path);
              click(0);
            }}
            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668331046337"
          ></img>
          <div className={style.searchContent}>
            <div className={style.searchBox}>
              <div className={style.icon}>
                <SearchOutlined></SearchOutlined>
              </div>
              <div className={style.inputBox}>
                <Popover
                  title={value.length === 0 ? "热搜榜" : "猜你想搜"}
                  trigger="focus"
                  content={() => {
                    return (
                      <div className={style.popover}>
                        <div
                          style={{
                            display: value.length === 0 ? "block" : "none",
                          }}
                        >
                          {hotWords.map((item, index) => {
                            return (
                              <HotWord
                                key={index}
                                index={index + 1}
                                content={item.content}
                                score={item.score}
                                word={item.searchWord}
                                iconUrl={item.iconUrl ? item.iconUrl : ""}
                              ></HotWord>
                            );
                          })}
                        </div>
                        <div
                          style={{
                            display: value.length === 0 ? "none" : "block",
                          }}
                        >
                          <img
                            style={{ height: "15px" }}
                            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1672477149646"
                          ></img>
                          <div className={style.songs}>
                            {suggestSong.map((item, index) => {
                              return (
                                <SuggestWord
                                  key={index}
                                  name={item.name}
                                  id={item.id}
                                  artist={dealWithStr(item)}
                                  type={0}
                                  word={value}
                                ></SuggestWord>
                              );
                            })}
                          </div>
                          <img
                            style={{ height: "14px" }}
                            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1672477278670"
                          ></img>
                          <div className={style.albums}>
                            {suggestAlbum.map((item, index) => {
                              return (
                                <SuggestWord
                                  key={index}
                                  name={item.name}
                                  artist={item.artist.name}
                                  id={item.id}
                                  type={1}
                                  word={value}
                                ></SuggestWord>
                              );
                            })}
                          </div>
                          <img
                            style={{ height: "14px" }}
                            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1672477492245"
                          ></img>
                          <div className={style.songlists}>
                            {suggestSonglist.map((item, index) => {
                              return (
                                <SuggestWord
                                  key={index}
                                  name={item.name}
                                  id={item.id}
                                  type={2}
                                  word={value}
                                ></SuggestWord>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }}
                >
                  <input
                    type="text"
                    onChange={async (e) => changeInput(e)}
                    onCompositionStart={() => {
                      flag = false;
                    }}
                    onCompositionEnd={(e) => {
                      flag = true;
                      changeInput(e);
                    }}
                    onKeyDown={search}
                    className={style.input}
                    value={value}
                    placeholder="请输入"
                  ></input>
                </Popover>
              </div>
            </div>
          </div>
          <div
            className={style.infoContainer}
            onClick={login}
            onMouseOver={() => {
              if (props.userInfo.isLogin === true) {
                exitBox.current.style.visibility = "visible";
                exitBox.current.style.opacity = 1;
              }
            }}
            onMouseOut={() => {
              exitBox.current.style.visibility = "hidden";
              exitBox.current.style.opacity = 0;
            }}
          >
            <img className={style.avatar} src={props.userInfo.avatar}></img>
            <div className={style.loginText}>{props.userInfo.name}</div>
            <div
              ref={exitBox}
              className={style.exitBox}
              onClick={() => {
                props.setUserInfo({
                  name: "未登录",
                  avatar:
                    "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668333498132",
                  vip: 0,
                  isLogin: false,
                });
                localStorage.removeItem("cookie");
                props.setSongsArr([]); //清空歌曲列表
                props.setUserLikeMusic([]); //清空用户喜欢的歌曲列表
              }}
            >
              <PoweroffOutlined />
              <div style={{ marginLeft: "4px" }}>退出登录</div>
            </div>
          </div>
        </Header>
        <Content className={style.container}>
          <Layout style={{ height: "100%" }}>
            <Sider className={style.sider} width={200}>
              {routerArr.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`
                      ${style.routerLink}
                      ${clickArr[index] === true ? style.clickLink : ""}`}
                    onClick={() => click(index)}
                  >
                    {item.name}
                  </div>
                );
              })}
            </Sider>
            <Content className={style.content}>
              <Outlet></Outlet>
            </Content>
          </Layout>
        </Content>
        <Footer className={style.footer}>
          <MusicControl></MusicControl>
        </Footer>
      </Layout>
    </div>
  );
}
const a = (state) => {
  return {
    loading: state.loading,
    loadingType: state.loadingType,
    userInfo: state.userInfo,
  };
};
const b = (dispatch) => {
  return {
    setUserInfo: (value) =>
      dispatch({
        type: "setUserInfo",
        data: value,
      }),
    setSongsArr: (value) =>
      dispatch({
        type: "setSongsArr",
        data: value,
      }),
    setUserLikeMusic: (v) => {
      dispatch({
        type: "setUserLikeMusic",
        data: v,
      });
    },
    setLoading: (v) => {
      dispatch({ type: "setLoading", data: v });
    },
  };
};
export default connect(a, b)(Index);
