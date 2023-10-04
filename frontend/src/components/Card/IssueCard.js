import React, { useEffect, useState } from "react";
import { Card, Modal } from "antd";
import { Button, Dropdown, Alert, Space } from "antd";
import { NotApproved } from "./NotApproved";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      await getData(`http://localhost:8087/api/issues/${id}`);
    }
    fetch();
  }, [0]);

  const {
    putData,
    response,
    isLoading: putLoading,
    error: putError,
  } = usePut();

  const handleNotApproval = async () => {
    if (data && data.length > 0) {
      data[0].status.push(status[1]);
      const body = {
        status: data[0].status,
      };
      await updateData(body);
    }
  };

  useEffect(() => {
    if (response) {
      console.log("response :", response);
      navigate(`/department/detailedview/${id}`);
      setShowAlert(true);
    }
  }, [response]);

  const handleClick = () => {
    if (data && data.length > 0) {
      console.log("inside ");
      data[0].status.push(status[0]);
      const body = {
        status: data[0].status,
      };
      updateData(body);
    }
  };

  async function updateData(body) {
    console.log(" body:", body);
    await putData(`http://localhost:8087/api/issues/${id}`, body); //?for now issue 2
  }

  const status = [
    {
      color: "blue",
      children: `Viewed Issue at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    },
    {
      color: "orange",
      dot: "(IssuesCloseOutlined)",
      children: `Not Approved Issue by Respective Department at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    },
    // {
    //   color: "red",
    //   dot: "(CloseCircleOutlined)",
    //   children: `Closed Issues at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
    // },
  ];

  return (
    <React.Fragment>
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
        onClick={() => {
          handleClick();
        }}
      >
        <Meta className="text-start" title={name} description={description} />
        <div className="flex justify-between items-center mt-4">
          <p>{place}</p>
          <div>|</div>
          <Button
            onClick={() => {
              handleNotApproval();
            }}
          >
            Not Approval
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};
