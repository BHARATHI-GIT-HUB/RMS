import React, { useState } from "react";
import {
  DownOutlined,
  SmileOutlined,
  CheckSquareFilled,
  InfoCircleFilled,
  IssuesCloseOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useDropDown } from "../../hooks/useDropDown";

export const Status = () => {
  const [menuId, setMenuID] = useState();

  const status = [
    {
      color: "green",
      children: "Approved Issue at 9/16/2023 at 17:29:50",
    },
    {
      color: "orange",
      children: "Estimated Arrival for service at 9/16/2023 at 17:29:50",
    },
    {
      color: "green",
      children: "Closed Issues at 9/16/2023 at 17:29:50",
    },
  ];

  const handleChange = (e) => {
    e.preventDefault();
    const { dropDown, isLoading, error } = useDropDown();
    console.log(menuId, status[menuId]);
  };

  return (
    <React.Fragment className="flex justify-center items-center h-screen">
      <Dropdown
        menu={{
          items,
        }}
      >
        <a
          onClick={(e) => {
            handleChange;
          }}
        >
          <Space>
            Update Status
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </React.Fragment>
  );
};
