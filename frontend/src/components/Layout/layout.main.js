import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import IssuesForm from "../form/issues.js";
import UserProfile from "../card/profile.js";
import TimeLine from "../timeline.js";

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // Initialize with default key

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]} // Highlight the selected item
          onSelect={handleMenuSelect} // Callback function for selecting menu items
        >
          <Menu.Item key="1" icon={<UserOutlined />} label="Issue Form">
            Issue Form
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} label="Profile">
            Profile
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />} label="Status">
            Status
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {selectedKey == "1" ? <IssuesForm /> : <TimeLine />}

          {/* <UserProfile /> */}
          {/* {selectedKey} */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
