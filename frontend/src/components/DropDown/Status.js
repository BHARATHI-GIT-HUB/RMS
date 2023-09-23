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

import React, { useState, useEffect } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Tooltip } from "antd";
import { usePut } from "../../hooks/usePut";
import { useGet } from "../../hooks/useGet";

export const Status = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState(-1);
  const [isDisable, setDisaple] = useState(true);
  const [statuslen, setStatusLen] = useState(0);
  const {
    putData,
    response,
    isLoading: putLoading,
    error: putError,
  } = usePut();
  const { getData, data, isLoading: getLoading, error: getError } = useGet();

  const handleMenuClick = async (item) => {
    setKey(item.key - 1);
    message.info(`Selected: ${items[item.key - 1].label}`);
    setSelectedItem(items[item.key - 1].label);
    console.log(key);

    // data.status.push();

    // await getData("http://localhost:8087/api/issues/2"); //?for now issue 2
  };

  useEffect(() => {
    async function fetch() {
      await getData("http://localhost:8087/api/issues/3"); //?for now issue 2
    }
    fetch();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      console.log("before upadata : ", data[0].status);

      data[0].status.push(status[key]);
      setStatusLen(data[0].status.length);
      const body = {
        status: data[0].status,
      };
      async function put() {
        await putData("http://localhost:8087/api/issues/3", body); //?for now issue 2
      }
      put();
      if (response) {
        setStatusLen(response[0].status.length);
      }
    }
  }, [key]);

  const status = [
    {
      color: "green",
      children: "Approved Issue at 9/16/2023 at 17:29:50",
    },
    {
      color: "green",
      children: "Annonced to Respective Department at 9/16/2023 at 17:29:50",
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

  const items = [
    {
      label: "Approval",
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: "Annonced to Respective Department",
      key: "2",
      icon: <UserOutlined />,

      disabled: statuslen >= 3 ? false : true,
    },
    {
      label: "Estimated Arrival date",
      key: "3",
      icon: <UserOutlined />,
      disabled: statuslen >= 4 ? false : true,
    },
    {
      label: "Close the issue",
      key: "4",
      icon: <UserOutlined />,
      danger: true,
      disabled: statuslen >= 5 ? false : true,
      danger: true,
    },
    {
      label: "Custom",
      key: "5",
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
