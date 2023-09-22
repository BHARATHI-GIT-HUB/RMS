import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space } from "antd";
export const Primary = ({ text }) => (
  <Space direction="vertical">
    <Space wrap className="flex justify-center items-center">
      <Button className="w-48">{text}</Button>
    </Space>
  </Space>
);
