import { IssueCard } from "./IssueCard";
import { useGet } from "../../hooks/useGet";
import React, { useState, useEffect } from "react";
import { Layout, Menu, Button, theme, Alert, Space } from "antd";
import DetailedView from "../DetailedView";

const { Header, Sider, Content } = Layout;

export const IssueCards = () => {
  const [showAlert, setShowAlert] = useState(false);

  const {
    getData: getUserData,
    data: userData,
    isloading: userDataLoading,
    error: userError,
  } = useGet();
  const {
    getData: getIssuesById,
    data: issueData,
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
    async function fetch() {
      if (userData.length > 0) {
        await getIssuesById(
          `http://localhost:8087/api/department/departmentissues/?id=${userData[0].id}`
        );
      }
    }
    fetch();
  }, [userData]);

  return (
    <>
      <Content className="grid grid-cols-3 items-center gap-6 space-y-3 justify-items-center">
        <>
          {issueData.length > 0 &&
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
