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

  const handleClick = () => {
    if (data && data.length > 0 && data[0].status.length <= 1) {
      data[0].status.push(status[0]);
      const body = {
        status: data[0].status,
      };
      updateData(body);
    }
    navigate(`/department/detailedview/${id}`);
    setShowAlert(true);
  };

  async function updateData(body) {
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
  ];

  return (
    <>
      <Card
        className="container w-full"
        // style={{
        //   width: 350,
        //   zIndex: 0,
        // }}
        cover={
          <img
            alt="example"
            src={`http://localhost:8087/images/` + photoUrl}
            className="max-h-60 object-center"
          />
        }
        onClick={() => {
          handleClick();
        }}
      >
        <Meta className="text-start" title={name} description={description} />
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 flex-wrap text-center">
          <p>{place}</p>
          <div className="hidden sm:block">|</div>
          <Button
            onClick={() => {
              handleNotApproval();
            }}
          >
            Not Approved
          </Button>
        </div>
      </Card>
    </>
  );
};
