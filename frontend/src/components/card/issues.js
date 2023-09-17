import React, { useState } from "react";
import { Card } from "antd";
import { Button, Dropdown } from "antd";
import Details from "../details";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";

const { Meta } = Card;

const IssuesCard = ({ id, name, description, place, currstatus, photoUrl }) => {
  const queryClient = useQueryClient();

  const updateIssueMutation = useMutation(
    (updatedData) => {
      return axios.put(`http://localhost:8087/api/issues/${id}`, updatedData);
    },
    {
      onSuccess: () => {
        console.log("updated");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
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
            updateIssueMutation.mutate(data);
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
            updateIssueMutation.mutate(data);
          }}
        >
          Not Approvaed
        </a>
      ),
    },
  ];

  return (
    <Card
      style={{
        width: 300,
      }}
      cover={
        <img alt="example" src={`http://localhost:8087/images/` + photoUrl} />
      } // Use the photoUrl prop
      // onClick={() => {
      //   navigate("/details/1");
      // }}
    >
      <Meta className="text-start" title={name} description={description} />
      <div className="flex justify-between items-center mt-4">
        <p>{place}</p>
        <div>|</div>
        <Dropdown
          menu={{ items }}
          placement="topRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button>Approval</Button>
        </Dropdown>
      </div>
    </Card>
  );
};
export default IssuesCard;
