import React from "react";
import { useState } from "react";
import Issues from "../card/issues";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import IssuesForm from "../form/issues.js";
import UserProfile from "../card/profile.js";
import Details from "../details";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Department />
    </QueryClientProvider>
  );
}

const { Header, Sider, Content } = Layout;

const Department = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1"); // Initialize with default key
  const post = [];

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(
        `http://localhost:8087/api/department/departmentissues/?id=${3}`
      ).then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  post.push(data);
  console.log(data);

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
  };

  const cardVal = [
    {
      name: "issue",
      description: "new",
      place: "",
      currstatus: "",
    },
  ];

  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
        >
          <Menu.Item key="1" icon={<UserOutlined />} label="Issue Form">
            Issues
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />} label="Profile">
            Profile
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            // background: colorBgContainer,
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
            // background: colorBgContainer,
          }}
        >
          {selectedKey == "1" ? (
            <div className="p-10">
              <Content className="grid grid-cols-3 items-center gap-6 space-y-3 justify-items-center">
                {post[0].map((value, idx) => (
                  <React.Fragment key={idx}>
                    <Issues
                      id={value.id}
                      name={value.title}
                      description={value.description}
                      place={value.place}
                      currstatus={value.status}
                      photoUrl={value.photo}
                    />
                  </React.Fragment>
                ))}

                {/* <Issues
                  name={cardVal[0].name}
                  description={cardVal[0].description}
                  place={cardVal[0].place}
                  currstatus={cardVal[0].status}
                /> */}
              </Content>
            </div>
          ) : (
            <UserProfile />
          )}
          {/* <UserProfile /> */}
          {/* {selectedKey} */}
        </Content>
      </Layout>
    </Layout>
  );
};
