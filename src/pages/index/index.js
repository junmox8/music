import React, { useState, useEffect, useRef } from "react";
import style from "./index.module.scss";
import Loading from "../../components/loginLoading";
import Login from "../../components/login";
import MusicControl from "../../components/musicControl";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { loginByQr, createQr } from "../../axios/service/login";
import { PoweroffOutlined } from "@ant-design/icons";
import routerArr from "../../json/routerArr";
import { connect } from "react-redux";
const { Header, Content, Footer, Sider } = Layout;
export default function Index(props) {
  useEffect(() => {
    if (localStorage.getItem("cookie")) {
      //如果本地存储有cookie则登陆状态
      setState(true);
      setUserInfo({
        name: localStorage.getItem("name"),
        avatar: localStorage.getItem("avatar"),
      });
    }
    navigate(routerArr[0].path, { replace: true });
    let arr = [];
    routerArr.forEach((item, index) => {
      arr.push(index === 0 ? true : false);
    });
    setClickArr(arr);
  }, []);
  const navigate = useNavigate();
  const [clickArr, setClickArr] = useState([]); //判断有没有点击路由
  const [isLogin, setLogin] = useState(false); //控制登录界面显示
  const [isLoading, setLoading] = useState(false); //控制loading显示
  const [qrimg, setImgUrl] = useState(""); //二维码图片url
  const [qrkey, setQrKey] = useState(""); //二维码图片key
  const [loginState, setState] = useState(false); //登陆状态
  const [userInfo, setUserInfo] = useState({
    //用户头像姓名
    name: "未登录",
    avatar:
      "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668333498132",
  });
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
    if (loginState === false) {
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
  return (
    <div className={style.global}>
      <div
        className={style.loadingBox}
        style={{
          display: isLogin === true || isLoading === true ? "block" : "none",
        }}
      >
        <div
          style={{
            display: isLogin === true || isLoading === true ? "block" : "none",
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
            sendUserInfo={(userInfo) => {
              setUserInfo(userInfo);
              setState(true);
              localStorage.setItem("name", userInfo.name);
              localStorage.setItem("avatar", userInfo.avatar);
            }}
          ></Login>
          <Loading display={isLoading}></Loading>
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
          <div
            className={style.infoContainer}
            onClick={login}
            onMouseOver={() => {
              if (loginState === true) {
                exitBox.current.style.visibility = "visible";
                exitBox.current.style.opacity = 1;
              }
            }}
            onMouseOut={() => {
              exitBox.current.style.visibility = "hidden";
              exitBox.current.style.opacity = 0;
            }}
          >
            <img className={style.avatar} src={userInfo.avatar}></img>
            <div className={style.loginText}>{userInfo.name}</div>
            <div
              ref={exitBox}
              className={style.exitBox}
              onClick={() => {
                setState(false);
                localStorage.removeItem("cookie");
                localStorage.removeItem("name");
                localStorage.removeItem("avatar");
                setUserInfo({
                  name: "未登录",
                  avatar:
                    "https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668333498132",
                });
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
