import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Button, Dropdown, Alert, Space } from "antd";
import { NotApproved } from "./NotApproved";

import { useGet } from "../../hooks/useGet";
import { usePut } from "../../hooks/usePut";
const { Meta } = Card;

export const IssueCard = ({
  id,
  name,
  description,
  place,
  currstatus,
  photoUrl,
  showAlert,
  setShowAlert,
  isCloseIssue,
  setIsCloseIssue,
}) => {
  const { getData, data, isLoading, error } = useGet();
  const {
    putData,
    response,
    isLoading: putLoading,
    error: putError,
  } = usePut();

  const handleNotApproval = () => {
    async function fetch() {
      await getData(`http://localhost:8087/api/issues/${id}`);
    }
    fetch();
  };

  useEffect(() => {
    if (data && data.length > 0) {
      data[0].status.push(status[0]);
      data[0].status.push(status[1]);

      const body = {
        status: data[0].status,
      };
      console.log("updagted body :", body);
      async function put() {
        await putData(`http://localhost:8087/api/issues/${id}`, body); //?for now issue 2
      }
      put();
    }
  }, [data]);

  useEffect(() => {
    if (response) {
      setShowAlert(true);
    }
  }, [response]);

  const status = [
    {
      color: "blue",
      children: `Viewed Issue at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    },
    {
      color: "yellow",
      dot: "(IssuesCloseOutlined)",
      children: `Not Allowed Issue to Respective Department at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    },
    {
      color: "red",
      dot: "(CloseCircleOutlined)",
      children: `Closed Issues at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    },
  ];

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            const data = {
              status: [
                ...currstatus,
                {
                  color: "blue",
                  children: `Viewed Issue at ${new Date().toLocaleDateString()} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `,
                },
                {
                  color: "green",
                  children: `Approved Issue ${new Date().toLocaleDateString()} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `,
                },
              ],
            };
          }}
        >
          Approvaed
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            const data = {
              status: [
                ...currstatus,
                {
                  color: "blue",
                  children: `Viewed Issue at ${new Date().toLocaleDateString()} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `,
                },
                {
                  color: "#00CCFF",
                  dot: "SmileOutlined",
                  children: `Not Approved Issue ${new Date().toLocaleDateString()} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} `,
                },
              ],
            };
          }}
        >
          Not Approvaed
        </a>
      ),
    },
  ];

  return (
    <React.Fragment>
      {showAlert ? (
        <Alert
          message="Request"
          description={`Do you like to close this issue ${name}`}
          type="info"
          action={
            <Space direction="vertical">
              <Button
                size="small"
                type="primary"
                onClick={() => setIsCloseIssue(true)}
              >
                Accept
              </Button>
              {/* <Button size="small" danger ghost>
                Decline
              </Button> */}
            </Space>
          }
          closable
          className="absolute top-20 right-10 z-10 "
        />
      ) : (
        ""
      )}
      <Card
        style={{
          width: 350,
          zIndex: 0,
        }}
        cover={
          <img
            alt="example"
            src={`http://localhost:8087/images/` + photoUrl}
            className="h-60 object-center"
          />
        }
      >
        <Meta className="text-start" title={name} description={description} />
        <div className="flex justify-between items-center mt-4">
          <p>{place}</p>
          <div>|</div>
          <Button onClick={handleNotApproval}>Not Approval</Button>
        </div>
      </Card>
    </React.Fragment>
  );
};
