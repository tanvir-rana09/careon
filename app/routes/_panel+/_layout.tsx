import {  Outlet, useLocation, useNavigate } from "@remix-run/react";
import { Layout, theme } from "antd";
import Cookies from "js-cookie";
import React, { useCallback, useEffect } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useDispatch } from "react-redux";
import Header from "~/components/panels/Layouts/Header";
import SideBar from "~/components/panels/Layouts/SideBar";
import { setCurrentUser } from "~/states/reducers/auth";

const PanelLayout: React.FC = () => {
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const router = useNavigate();

  const tokenChecker = useCallback(() => {
    const authToken = Cookies.get("authToken") ?? null;
    if (!authToken) {
      return router(`/login?redirect=${pathname}`, { replace: true });
    }

    const myDecodedToken = decodeToken(authToken);
    const isMyTokenExpired = isExpired(authToken);
    if (isMyTokenExpired) {
      return router(`/login?redirect=${pathname}`, { replace: true });
    }

    dispatch(
      setCurrentUser({
        token: authToken,
        isAuthenticate: true,
        decodeToken: myDecodedToken,
      })
    );
  }, [dispatch, pathname, router]);

  useEffect(() => {
    // tokenChecker();
  }, [tokenChecker]);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Layout.Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 999,
          padding: 0,
          height: "auto",
          background: token.colorWhite,
        }}
      >
        <Header />
      </Layout.Header>
      <Layout style={{ overflow: "hidden" }}>
        <Layout.Sider
          style={{
            background: "#F0F2F5",
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 999,
          }}
        >
          <SideBar />
        </Layout.Sider>
        <Layout.Content
          style={{
            marginLeft: 325,
            padding: "20px 20px 80px 20px",
            overflowY: "auto",
            height: "calc(100vh - 57px)",
            background: "#f0f2f5",
          }}
          className="scrollbar-thin scrollbar-thumb-black scrollbar-track-[#F3F4EE]"
        >
          <Outlet />
         
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PanelLayout;
