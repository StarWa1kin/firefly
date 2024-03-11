import { Link, Outlet } from "umi";
import "@/global.css";

import React, { useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import SideNavMenu from "@/components/SideNavMenu";

const { Header, Content, Footer, Sider } = Layout;

const LayoutPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical bg-white text-center">LOGO</div>
        {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} /> */}
        <SideNavMenu></SideNavMenu>
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "16px", overflow: "auto" }}>
          <div
            style={{
              padding: 16,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
