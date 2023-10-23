import React from "react";
import { Button, notification } from "antd";
const key = "updatable";
const Notification = ({ message, type }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      key,
      message: "Notification Title",
      description: "description.",
    });
    setTimeout(() => {
      api.open({
        key,
        message: "New Title",
        description: "New description.",
      });
    }, 1000);
  };
  return (
    <>
      {contextHolder}
      <Button type="primary" danger onClick={openNotification}>
        Close the Issue
      </Button>
    </>
  );
};
export default Notification;
