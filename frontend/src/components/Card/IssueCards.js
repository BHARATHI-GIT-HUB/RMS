import { IssueCard } from "./IssueCard";
import { useGet } from "../../hooks/useGet";
import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, theme, Alert, Space } from "antd";
import DetailedView from "../DetailedView";
import Loading from "../Loading";
import io from "socket.io-client";

const { Header, Sider, Content } = Layout;

const socket = io.connect("http://localhost:8087");

export const IssueCards = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [issueData, setIssueData] = useState("");

  const {
    getData: getUserData,
    data: userData,
    isloading: userDataLoading,
    error: userError,
  } = useGet();
  const {
    getData: getIssuesById,
    data: issueDataFromServer,
    isloading: issuesLoading,
    error: IssueError,
  } = useGet();

  useEffect(() => {
    async function fetch() {
      const user = localStorage.getItem("user");
      const data = JSON.parse(user);
      await getUserData(`http://localhost:8087/api/department/${data.id}`);
    }

    fetch();
  }, []);

  useEffect(() => {
    socket.on("new_issue_data", (data) => {
      setIssueData((prevData) => [data]);
    });
  }, [socket]);

  useEffect(() => {
    if (issueDataFromServer[0] && issueDataFromServer[0].length > 0) {
      setIssueData((prevData) => [...prevData, ...issueDataFromServer]);
    }
  }, [issueDataFromServer]);

  useEffect(() => {
    async function fetch() {
      if (userData.length > 0) {
        await getIssuesById(
          `http://localhost:8087/api/department/departmentissues/?id=${userData[0].id}`
        );
      }
    }
    fetch();
  }, [userData]);

  if (issuesLoading) {
    return <Loading />;
  }

  if (issueDataFromServer && issueDataFromServer[0] <= 0) {
    return (
      <h1 className="flex justify-center items-center text-xl font-normal w-full">
        No Issue Posted yet{" "}
      </h1>
    );
  }

  return (
    <>
      <Content className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 auto-cols-max items-center gap-6 space-y-3 justify-items-center">
        <>
          {issueData[0] &&
            issueData[0].length > 0 &&
            issueData[0].map((value, idx) => (
              <React.Fragment key={idx}>
                <IssueCard
                  id={value.id}
                  name={value.title}
                  description={value.description}
                  place={value.place}
                  currstatus={value.status}
                  photoUrl={value.photo}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />
              </React.Fragment>
            ))}
        </>
      </Content>
    </>
  );
};
