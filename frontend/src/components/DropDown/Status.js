// import React, { useState } from "react";
// import {
//   DownOutlined,
//   SmileOutlined,
//   CheckSquareFilled,
//   InfoCircleFilled,
//   IssuesCloseOutlined,
// } from "@ant-design/icons";
// import { Dropdown, Space } from "antd";
// import { useDropDown } from "../../hooks/useDropDown";

// export const Status = () => {
//   // const [menuId, setMenuID] = useState();
//   const { dropDown, isLoading, error } = useDropDown();

//   // const handleChange = (e) => {
//   //   e.preventDefault();
//   // };

//   return (
//     <React.Fragment className="flex justify-center items-center h-screen">
//       <Dropdown
//       // menu={{
//       //   status,
//       // }}
//       >
//         <a onClick={(e) => {}}>
//           <Space>
//             Update Status
//             <DownOutlined />
//           </Space>
//         </a>
//       </Dropdown>
//     </React.Fragment>
//   );
// };

import React, { useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";

export const Status = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleMenuClick = (item) => {
    message.info(`Selected: ${items[item.key - 1].label}`);
    setSelectedItem(items[item.key - 1].label);
  };

  const items = [
    {
      label: "1st menu item",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "2nd menu item",
      key: "2",
      icon: <UserOutlined />,
    },
    {
      label: "3rd menu item",
      key: "3",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "4rd menu item",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: true,
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            {selectedItem ? selectedItem : "Select an item"}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  );
};

export default Status;
