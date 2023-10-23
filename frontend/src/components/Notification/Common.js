import React, { useEffect } from "react";
import { Button, notification, Space } from "antd";
const Common = ({ message, type }) => {
  useEffect(() => {
    return openNotificationWithIcon(message, type);
  }, []);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (message, type) => {
    console.log(message, type);
    api[type]({
      message: message,
      //   description:
      //     "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  return <>{contextHolder}</>;
};
export default Common;
