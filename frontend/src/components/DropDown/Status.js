// import React, { useState, useEffect } from "react";
// import {
//   DownOutlined,
//   UserOutlined,
//   CheckCircleOutlined,
//   IssuesCloseOutlined,
//   ClockCircleOutlined,
//   CloseCircleOutlined,
//   QuestionCircleOutlined,
// } from "@ant-design/icons";
// import { Button, Dropdown, message, Space, Modal, Calendar } from "antd";
// import { usePut } from "../../hooks/usePut";
// import { useGet } from "../../hooks/useGet";
// import { DatePicker } from "antd";

// export const Status = ({ id }) => {
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [key, setKey] = useState(-1);
//   const [customInput, setCustomInput] = useState("");
//   const [isCustomSelected, setIsCustomSelected] = useState(false); // Track if "Custom" is selected
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isCalander, setCalander] = useState(false);
//   const [isApproved, setisApproved] = useState(true);
//   const [statuslen, setStatusLen] = useState(0);

//   const {
//     putData,
//     response,
//     isLoading: putLoading,
//     error: putError,
//   } = usePut();

//   const { getData, data, isLoading: getLoading, error: getError } = useGet();

//   const handleOk = () => {
//     setIsCustomSelected(false);
//     setCalander(false);
//     if (isCustomSelected) {
//       setKey(4);
//     }
//     if (selectedDate != null && selectedDate.length > 0) {
//       setKey(2);
//     }
//   };

//   const handleCancel = () => {
//     setIsCustomSelected(false);
//     setCalander(false);
//   };
//   const handleMenuClick = async (item) => {
//     message.info(`Selected: ${items[item.key - 1].label}`);
//     setSelectedItem(items[item.key - 1].label);
//     if (items[item.key - 1].label === "Custom") {
//       setIsCustomSelected(true);
//       if (isCustomSelected) {
//         setKey(item.key - 1);
//       }
//     } else if (items[item.key - 1].label.split(" ")[0] == "Estimated") {
//       setCalander(true);
//     } else {
//       setKey(item.key - 1);
//     }
//   };

//   useEffect(() => {
//     async function fetch() {
//       await getData(`http://localhost:8087/api/issues/${id}`);
//     }
//     fetch();
//   }, []);

//   useEffect(() => {
//     if (data && data.length > 0) {
//       setStatusLen(data[0].status.length);
//       if (data[0].status.some((item) => item.children.includes("Not"))) {
//         setisApproved(false);
//       }
//     }

//     if (response) {
//       window.location.reload(false);
//     }
//   }, [data, response]);

//   useEffect(() => {
//     try {
//       if (data && data.length > 0) {
//         let body = {};

//         let isAlreadyExist = data[0].status.some((item) => {
//           if (item != null) {
//             return (
//               item.children.split(" ")[0] === status[key].children.split(" ")[0]
//             );
//           }
//         });

//         if (!isAlreadyExist && data && data.length > 0) {
//           data[0].status.push(status[key]);
//           setStatusLen(data[0].status.length);
//           body = {
//             status: data[0].status,
//           };
//           put();
//         }

//         async function put() {
//           await putData(`http://localhost:8087/api/issues/${id}`, body); //?for now issue 2
//         }
//       }
//     } catch (err) {
//       message.info(err);
//     }
//   }, [key]);

//   const status = [
//     {
//       color: "green",
//       dot: "(CheckCircleOutlined)",
//       children: `Approved Issue at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
//     },
//     {
//       color: "green",
//       dot: "(IssuesCloseOutlined)",
//       children: `Annonced to Respective Department at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
//     },
//     {
//       color: "orange",
//       dot: "(ClockCircleOutlined)",
//       children: `Estimated Arrival for service at ${selectedDate}`,
//     },
//     {
//       color: "red",
//       dot: "(CloseCircleOutlined)",
//       children: `Closed Issues at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
//     },
//     {
//       color: "blue",
//       dot: "(QuestionCircleOutlined)",
//       children: `${customInput} at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
//     },
//   ];

//   const items = [
//     {
//       label: "Approval",
//       key: "1",
//       icon: <CheckCircleOutlined />,
//     },
//     {
//       label: "Annonced to Respective Department",
//       key: "2",
//       icon: <IssuesCloseOutlined />,
//       disabled: statuslen >= 3 ? false : true,
//     },
//     {
//       label: "Estimated Arrival",
//       key: "3",
//       icon: <ClockCircleOutlined />,
//       disabled: statuslen >= 4 ? false : true,
//     },
//     {
//       label: "Close the issue",
//       key: "4",
//       icon: <CloseCircleOutlined />,
//       danger: true,
//       disabled: statuslen >= 5 ? false : true,
//       danger: true,
//     },
//     {
//       label: "Custom",
//       key: "5",
//       icon: <QuestionCircleOutlined />,
//       disabled: statuslen >= 3 ? false : true,
//     },
//   ];

//   const notApprovedItems = [
//     {
//       label: "Approval",
//       key: "1",
//       icon: <CheckCircleOutlined />,
//     },
//     {
//       label: "Close the issue",
//       key: "2",
//       icon: <CloseCircleOutlined />,
//       disabled: statuslen >= 5 ? false : true,
//       danger: true,
//     },
//     {
//       label: "Custom",
//       key: "3",
//       icon: <QuestionCircleOutlined />,
//       disabled: statuslen >= 3 ? false : true,
//     },
//   ];

//   const menuProps = {
//     items,
//     onClick: handleMenuClick,
//   };

//   const handleClick = (item) => {
//     console.log(item);
//   };

//   const notApprovedMenuProps = {
//     notApprovedItems,
//     onClick: handleClick,
//   };

//   const onChange = (date, dateString) => {
//     setSelectedDate(dateString);
//   };

//   return (
//     <Space>
//       {isApproved ? (
//         <Dropdown overlay={menuProps} placement="bottomLeft" arrow>
//           {isCustomSelected ? (
//             <Modal
//               title="Custom Input"
//               visible={isCustomSelected}
//               onOk={handleOk}
//               onCancel={handleCancel}
//             >
//               <input
//                 type="text"
//                 value={customInput}
//                 onClick={() => {
//                   console.log(isCustomSelected, "set");
//                 }}
//                 onChange={(e) => setCustomInput(e.target.value)}
//                 className="text-black border-[1.5px] border-blue-600 focus:border-blue-600 rounded-sm w-1/2"
//               />
//             </Modal>
//           ) : isCalander ? (
//             <Modal
//               title="Expected Date"
//               visible={isCalander}
//               onOk={handleOk}
//               onCancel={handleCancel}
//             >
//               <DatePicker onChange={onChange} />
//             </Modal>
//           ) : (
//             <Button>
//               <Space>
//                 {selectedItem ? selectedItem : "update status"}
//                 <DownOutlined />
//               </Space>
//             </Button>
//           )}
//         </Dropdown>
//       ) : (
//         <Dropdown overlay={menuProps}>
//           <Button>
//             <Space>
//               {selectedItem ? selectedItem : "update status"}
//               <DownOutlined />
//             </Space>
//           </Button>
//         </Dropdown>
//       )}
//     </Space>
//   );
// };

// export default Status;

import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, message, Space, Modal, Calendar } from "antd";
import { usePut } from "../../hooks/usePut";
import { useGet } from "../../hooks/useGet";
import { DatePicker } from "antd";

export const Status = ({
  menuProps,
  isCustomSelected,
  handleOk,
  handleCancel,
  customInput,
  setCustomInput,
  isCalander,
  onChange,
  selectedItem,
}) => {
  return (
    <Space wrap>
      <Dropdown menu={menuProps} placement="bottomLeft" arrow>
        {isCustomSelected ? (
          <>
            <Modal
              title="Custom Input"
              open={isCustomSelected}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="text-black border-[1.5px] border-blue-600 focus:border-blue-600 rounded-sm w-1/2"
              />
            </Modal>
          </>
        ) : isCalander ? (
          <>
            <Modal
              title="Expected Date"
              open={isCalander}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <DatePicker onChange={onChange} />
            </Modal>
          </>
        ) : (
          <Button className="capitalize">
            <Space>
              {selectedItem ? selectedItem : "update status"}
              <DownOutlined />
            </Space>
          </Button>
        )}
      </Dropdown>
    </Space>
  );
};

export default Status;
