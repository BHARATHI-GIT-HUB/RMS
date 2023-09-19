import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
// import Update from "../../pages/register.js";
import { Avatar, Card, Skeleton, Switch } from "antd";
const { Meta } = Card;
export const ProfileCard = () => {
  const [loading, setLoading] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);

  const onChange = (checked) => {
    setLoading(!checked);
  };
  const handleEditClick = () => {
    setIsEditVisible(true);
  };
  return (
    <div className="grid grid-flow-col justify-evenly ">
      {/* <Switch checked={!loading} onChange={onChange} /> */}
      {isEditVisible ? (
        // <Update />
        <></>
      ) : (
        <>
          <Card
            className="flex flex-col min-w-[23rem] justify-center items-center gap-4 "
            actions={[<EditOutlined key="edit" onClick={handleEditClick} />]}
          >
            <Skeleton loading={loading} avatar active>
              <Meta
                className="pl-8"
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
                }
              />
              <div className="flex flex-col justify-center items-center mt-6 gap-3">
                <h2>Card title</h2>
                <p>This is the description</p>
              </div>
            </Skeleton>
          </Card>
          <Card className="flex flex-col min-w-[23rem]  gap-4 px-0">
            <ul className="grid grid-flow-row gap-2">
              <li className="flex gap-20 items-start p-2 border-b-[0.3px] border-gray-200">
                <h3>Full Name</h3>
                <p>alpha</p>
              </li>
              <li className="flex gap-28 items-start p-2 border-b-[0.3px] border-gray-200">
                <h3>Email </h3>
                <p>alpha@gmail.com</p>
              </li>
              <li className="flex gap-20 items-start p-2 border-b-[0.3px] border-gray-200">
                <h3>Password </h3>
                <p>alpha</p>
              </li>
              <li className="flex gap-16 items-start p-2 border-b-[0.3px] border-gray-200">
                <h3>Designation</h3>
                <p>alpha</p>
              </li>
              <li className="flex gap-11 items-start p-2">
                <h3>Phone Number</h3>
                <p>xxxxxxxxxx</p>
              </li>
            </ul>
          </Card>
        </>
      )}
    </div>
  );
};
