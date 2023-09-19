import React from "react";
import { Timeline, Spin, Space } from "antd";
const Index = () => {
  return (
    <div className="flex justify-center items-center h-[700px]">
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Spin tip="Loading" size="large">
          <div className="content" />
        </Spin>
      </Space>
    </div>
  );
};

export default Index;
