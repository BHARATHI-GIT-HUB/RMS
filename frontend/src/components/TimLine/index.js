import React, { useEffect } from "react";
import Loading from "../../components/Loading";
import {
  CheckCircleOutlined,
  IssuesCloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Timeline, Spin, Space } from "antd";
import { SmileOutlined } from "@ant-design/icons";

export const TimeLine = ({ status }) => {
  console.log(status, "Data");

  const componentMap = {
    ClockCircleOutlined: ClockCircleOutlined,
    CloseCircleOutlined: CloseCircleOutlined,
    IssuesCloseOutlined: IssuesCloseOutlined,
    QuestionCircleOutlined: QuestionCircleOutlined,
  };

  const convertDotStringToJSX = (item) => {
    if (item.dot) {
      const iconContent = item.dot.replace(/(\(|\))/g, "");
      const DotComponent = componentMap[iconContent];
      if (DotComponent) {
        return { ...item, dot: <DotComponent style={{ fontSize: "16px" }} /> };
      }
    }
    return item;
  };

  return (
    <div className="mt-10">
      <Timeline
        mode="alternate"
        items={status && status.map(convertDotStringToJSX)}
        className=""
      />
    </div>
  );
};
