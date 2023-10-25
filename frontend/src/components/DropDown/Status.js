import React, { useState, useEffect } from "react";
import {
  DownOutlined,
  UserOutlined,
  CheckCircleOutlined,
  IssuesCloseOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, message, Space, Modal } from "antd";
import { usePut } from "../../hooks/usePut";
import { useGet } from "../../hooks/useGet";
import { ModalToDisplay } from "./Modal";

export const Status = ({ id }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [key, setKey] = useState(-1);
  const [customInput, setCustomInput] = useState("");
  const [isCustomSelected, setIsCustomSelected] = useState(false); // Track if "Custom" is selected

  const [statuslen, setStatusLen] = useState(0);
  const {
    putData,
    response,
    isLoading: putLoading,
    error: putError,
  } = usePut();
  const { getData, data, isLoading: getLoading, error: getError } = useGet();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsCustomSelected(false);
    setKey(4);
  };
  const handleCancel = () => {
    setIsCustomSelected(false);
  };

  const handleMenuClick = async (item) => {
    message.info(`Selected: ${items[item.key - 1].label}`);
    setSelectedItem(items[item.key - 1].label);
    if (items[item.key - 1].label === "Custom") {
      setIsCustomSelected(true); // Set to true when "Custom" is selected
      if (isCustomSelected) {
        setKey(item.key - 1);
      }
    } else {
      setIsCustomSelected(false); // Reset to false for other selections
      setKey(item.key - 1);
    }
  };

  useEffect(() => {
    async function fetch() {
      await getData(`http://localhost:8087/api/issues/${id}`); //?for now issue 2
    }
    fetch();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setStatusLen(data[0].status.length);
    }
    if (response) {
      window.location.reload(false);
    }
  }, [data, response]);

  useEffect(() => {
    try {
      if (data && data.length > 0) {
        data[0].status.push(status[key]);
        setStatusLen(data[0].status.length);
        const body = {
          status: data[0].status,
        };
        async function put() {
          await putData(`http://localhost:8087/api/issues/${id}`, body); //?for now issue 2
        }
        put();
      }
    } catch (err) {
      message.info(err);
    }
  }, [key]);

  const status = [
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
      children: `Estimated Arrival for service at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
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

  const items = [
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
      label: "Estimated Arrival date",
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

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Space wrap>
      <Dropdown menu={menuProps} placement="bottomLeft" arrow>
        {isCustomSelected ? (
          <>
            <Button>
              <Space>
                {selectedItem ? selectedItem : "Select an item"}
                <DownOutlined />
              </Space>
            </Button>
            <Modal
              title="Custom Input"
              open={isCustomSelected}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <input
                type="text"
                value={customInput}
                onClick={() => {
                  console.log(isCustomSelected, "set");
                }}
                onChange={(e) => setCustomInput(e.target.value)}
                className="text-black border-[1.5px] border-blue-600 focus:border-blue-600 rounded-sm w-1/2"
              />
            </Modal>
          </>
        ) : (
          <Button>
            <Space>
              {selectedItem ? selectedItem : "Select an item"}
              <DownOutlined />
            </Space>
          </Button>
        )}
      </Dropdown>
    </Space>
  );
};

export default Status;
