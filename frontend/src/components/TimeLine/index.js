import React from "react";

import {
  CheckCircleOutlined,
  IssuesCloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Timeline, Spin, Space } from "antd";

export const TimeLine = ({ status, setShowDeleteAlert }) => {
  const componentMap = {
    CheckCircleOutlined: CheckCircleOutlined,
    ClockCircleOutlined: ClockCircleOutlined,
    CloseCircleOutlined: CloseCircleOutlined,
    IssuesCloseOutlined: IssuesCloseOutlined,
    QuestionCircleOutlined: QuestionCircleOutlined,
  };

  const convertDotStringToJSX = (item) => {
    if (item != null) {
      if (item.dot) {
        const iconContent = item.dot.replace(/(\(|\))/g, "");
        const DotComponent = componentMap[iconContent];
        if (
          setShowDeleteAlert != undefined &&
          item.dot == "(CloseCircleOutlined)"
        ) {
        }
        if (DotComponent) {
          return {
            ...item,
            dot: <DotComponent style={{ fontSize: "16px" }} />,
          };
        }
      }
    }
    return item;
  };

  return (
    <div className="mt-10">
      <Timeline
        mode="alternate"
        items={status && status.map(convertDotStringToJSX)}
      />
    </div>
  );
};
