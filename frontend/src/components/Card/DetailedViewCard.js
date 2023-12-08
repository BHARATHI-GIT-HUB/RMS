import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Status } from "../DropDown";
import { Button, Dropdown, message, Space, Modal, Calendar } from "antd";
import { usePut } from "../../hooks/usePut";
import { useGet } from "../../hooks/useGet";

import {
  DownOutlined,
  UserOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export function DetailedViewCard({ value }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState(-1);
  const [customInput, setCustomInput] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false); // Track if "Custom" is selected
  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalander, setCalander] = useState(false);
  const [isApproved, setApproved] = useState(true);
  const [statuslen, setStatusLen] = useState(0);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState([]);

  const {
    putData,
    response,
    isLoading: putLoading,
    error: putError,
  } = usePut();
  const { getData, data, isLoading: getLoading, error: getError } = useGet();

  const handleOk = () => {
    setIsCustomSelected(false);
    setCalander(false);
    if (isCustomSelected) {
      setKey(4);
    }
    if (selectedDate != null && selectedDate.length > 0) {
      setKey(2);
    }
  };

  const handleCancel = () => {
    setIsCustomSelected(false);
    setCalander(false);
  };

  const handleMenuClick = (item) => {
    message.info(`Selected: ${items[item.key - 1].label}`);
    setSelectedItem(items[item.key - 1].label);
    if (items[item.key - 1].label === "Custom") {
      setIsCustomSelected(true);
      if (isCustomSelected) {
        setKey(item.key - 1);
      }
    } else if (items[item.key - 1].label.split(" ")[0] == "Estimated") {
      setCalander(true);
    } else {
      setKey(item.key - 1);
    }
  };

  useEffect(() => {
    async function fetch() {
      await getData(`http://localhost:8087/api/issues/${value.id}`); //?for now issue 2
    }
    fetch();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setStatusLen(data[0].status.length);
      if (data[0].status.some((item) => item.children.includes("Not"))) {
        setApproved(false);
      }
    }
    if (response) {
      window.location.reload(false);
    }
  }, [data, response]);

  useEffect(() => {
    try {
      if (data && data.length > 0 && statuslen > 0) {
        let body = {};
        let isAlreadyExist = data[0].status.some((item) => {
          if (item != null) {
            return (
              item.children.split(" ")[0] === status[key].children.split(" ")[0]
            );
          }
        });

        if (!isAlreadyExist && data && data.length > 0) {
          data[0].status.push(status[key]);
          setStatusLen((prev) => prev + 1);
          body = {
            status: data[0].status,
          };
          if (statuslen > 0) {
            put();
          }
        }

        async function put() {
          await putData(`http://localhost:8087/api/issues/${value.id}`, body); //?for now issue 2
        }
      }
    } catch (err) {
      message.info(err);
    }
  }, [key]);

  useEffect(() => {
    // Initialize the items array based on isApproved

    let initialItems = [];
    let initialStatus = [];

    if (isApproved && data && data.length > 0) {
      initialItems = [
        {
          label: "Approval",
          key: "1",
          icon: <CheckCircleOutlined />,
        },
        {
          label: "Annonced to Respective Department",
          key: "2",
          icon: <IssuesCloseOutlined />,
          disabled: statuslen >= 3 ? false : true,
        },
        {
          label: "Estimated Arrival",
          key: "3",
          icon: <ClockCircleOutlined />,
          disabled: statuslen >= 4 ? false : true,
        },
        {
          label: "Close the issue",
          key: "4",
          icon: <CloseCircleOutlined />,
          danger: true,
          disabled: statuslen >= 5 ? false : true,
          danger: true,
        },
        {
          label: "Custom",
          key: "5",
          icon: <QuestionCircleOutlined />,
          disabled: statuslen >= 3 ? false : true,
        },
      ];

      initialStatus = [
        {
          color: "green",
          dot: "(CheckCircleOutlined)",
          children: `Approved Issue at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
        {
          color: "green",
          dot: "(IssuesCloseOutlined)",
          children: `Annonced to Respective Department at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
        {
          color: "orange",
          dot: "(ClockCircleOutlined)",
          children: `Estimated Arrival for service at ${selectedDate}`,
        },
        {
          color: "red",
          dot: "(CloseCircleOutlined)",
          children: `Closed Issues at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
        {
          color: "blue",
          dot: "(QuestionCircleOutlined)",
          children: `${customInput} at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
      ];
    } else if (!isApproved && data && data.length > 0) {
      initialItems = [
        {
          label: "Approval",
          key: "1",
          icon: <CheckCircleOutlined />,
        },

        {
          label: "Close the issue",
          key: "2",
          icon: <CloseCircleOutlined />,
          danger: true,
        },
        {
          label: "Custom",
          key: "3",
          icon: <QuestionCircleOutlined />,
        },
      ];
      initialStatus = [
        {
          color: "green",
          dot: "(CheckCircleOutlined)",
          children: `Approved Issue at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
        {
          color: "red",
          dot: "(CloseCircleOutlined)",
          children: `Closed Issues at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
        {
          color: "blue",
          dot: "(QuestionCircleOutlined)",
          children: `${customInput} at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
        },
      ];
    }

    setItems(initialItems);
    setStatus(initialStatus);
  }, [isApproved, data, statuslen]);

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onChange = (date, dateString) => {
    setSelectedDate(dateString);
  };
  console.log(statuslen);
  return (
    <>
      <Card
        className="flex flex-col justify-center mt-10"
        hoverable
        style={{
          width: 370,
        }}
        cover={
          <img
            alt="example"
            src={`http://localhost:8087/images/` + value.photo}
            className="h-[250px] object-center"
          />
        }
        actions={[
          <Status
            menuProps={menuProps}
            isCustomSelected={isCustomSelected}
            handleOk={handleOk}
            handleCancel={handleCancel}
            customInput={customInput}
            setCustomInput={setCustomInput}
            isCalander={isCalander}
            onChange={onChange}
            selectedItem={selectedItem}
          />,

          <Meta description={value.place} />,
        ]}
      >
        <Meta
          className="text-center"
          title={value.title}
          description={value.description}
        />
      </Card>
    </>
  );
}
