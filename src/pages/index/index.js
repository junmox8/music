import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import routerArr from "../../json/routerArr";
import { click } from "@testing-library/user-event/dist/click";
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
  const click = (index) => {
    let arr = [];
    for (let i = 0; i <= clickArr.length - 1; i++) {
      arr.push(i == index ? true : false);
    }
    setClickArr(arr);
    navigate(routerArr[index].path);
  };
  return (
    <div className={style.global}>
      <Layout style={{ height: "100%" }}>
        <Header className={style.header}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(routerArr[0].path);
              click(0);
            }}
            src="https://huangjunyi-1310688513.cos.ap-shanghai.myqcloud.com/articleCover/1668331046337"
          ></img>
          <div className={style.infoContainer}>
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
