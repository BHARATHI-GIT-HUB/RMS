// import React, { useState } from "react";
// import { UserOutlined, FormOutlined } from "@ant-design/icons";
// import { Breadcrumb, Layout, Menu, theme } from "antd";
// import IssuesForm from "../form/issues";
// import EmployeeLayout from "../Layout/layout.employee";
// import DepartmentLayout from "../Layout/layout.department";

// const { Header, Content, Footer, Sider } = Layout;
// function getItem(label, key, icon, children) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   };
// }

// //? department

// // const items = [
// //   getItem("Issues", "1", <ExclamationOutlined />),
// //   getItem("User", "2", <UserOutlined />),
// // ];

// //? Employee

// const items = [
//   getItem("Issues Form", "1", <FormOutlined />),
//   getItem("User", "2", <UserOutlined />),
// ];

// const App = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   return (
//     <Layout
//       style={{
//         minHeight: "100vh",
//       }}
//     >
//       <Sider
//         collapsible
//         collapsed={collapsed}
//         onCollapse={(value) => setCollapsed(value)}
//       >
//         <div className="demo-logo-vertical" />
//         <Menu
//           theme="dark"
//           defaultSelectedKeys={["1"]}
//           mode="inline"
//           items={items}
//         />
//       </Sider>
//       <Layout className="flex justify-center items-center">
//         {/* <DepartmentLayout /> */}
//         <EmployeeLayout />
//       </Layout>
//     </Layout>
//   );
// };
// export default App;

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import Employee from "../Layout/layout.employee";
import EditProfile from "../form/profile/profile.employee";
import Issues from "../card/issues";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="min-h-screen"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FormOutlined />,
              label: "Issues Form",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "Empoyee Details",
            },
          ]}
        />
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
          className=""
          style={{
            margin: "24px 16px",
            padding: 24,
            // minHeight: full,
            background: colorBgContainer,
          }}
        >
          <Content className="grid grid-cols-4 items-center gap-6">
            <Issues />
            <Issues />
            <Issues />
            <Issues />
            <Issues />
            <Issues />
            <Issues />
            <Issues />
          </Content>
          {/* <Employee /> */}
          {/* Content */}
          {/* <EditProfile /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
