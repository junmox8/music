import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import Loading from "../../components/loginLoading";
import Login from "../../components/login";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { loginByQr, createQr } from "../../axios/service/login";
import routerArr from "../../json/routerArr";

const { Header, Content, Footer, Sider } = Layout;
export default function Index() {
  useEffect(() => {
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
  const click = (index) => {
    let arr = [];
    for (let i = 0; i <= clickArr.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setClickArr(arr);
    navigate(routerArr[index].path);
  };
  const login = async () => {
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
          <div className={style.infoContainer} onClick={login}>
            <img
              className={style.avatar}
              src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668333498132"
            ></img>
            <div className={style.loginText}>未登录</div>
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
          <video
            style={{ width: "100%", height: "53px" }}
            autoPlay
            controls
          ></video>
        </Footer>
      </Layout>
    </div>
  );
}
