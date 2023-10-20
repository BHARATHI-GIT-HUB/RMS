import React, { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import Loading from "../Loading";
import { TimeLine } from ".";
import { Alert, Button, Space, notification } from "antd";

function EmployeeStatus() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Deleted Succesfully",
      description: `Issue is Deleted Succesfully`,
    });
  };
  const {
    getData: getUserData,
    data: userData,
    isLoading: userDataLoading,
    error: userdataError,
  } = useGet();
  const {
    getData: getIssueData,
    data: issueData,
    isLoading: issueDataLoading,
    error: issueError,
  } = useGet();
  const { DeleteData, response, isLoading, error } = useDelete();

  useEffect(() => {
    async function fetch() {
      const user = JSON.parse(localStorage.getItem("user"));
      await getUserData(`http://localhost:8087/api/employee/${user.id}`);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      await getIssueData(
        `http://localhost:8087/api/issues/employee/${userData[0].id}`
      );
    }
    if (userData && userData.length > 0) {
      fetch();
    }
  }, [userData]);

  useEffect(() => {
    if (issueData[0] && issueData[0].length > 0) {
      issueData[0][0].status.forEach((item, index) => {
        if (item != null) {
          if (
            item.children.includes("Closed") == true &&
            showDeleteAlert == false
          ) {
            setShowDeleteAlert(true);
          }
        }
      });
    }
  }, [issueData[0]]);

  if (issueDataLoading || userDataLoading) {
    return <Loading />;
  }

  if (issueError || userdataError) {
    return (
      <Alert message={issueError ? issueError : userdataError} type="error" />
    );
  }

  if (response) {
    window.location.reload(false);
  }

  const handleClick = () => {
    async function fetch() {
      setShowDeleteAlert(false);
      openNotificationWithIcon("success");
      setTimeout(async () => {
        await DeleteData(
          `http://localhost:8087/api/issues/${issueData[0][0].id}`
        );
      }, 1000);
    }
    fetch();
  };

  return (
    <>
      {contextHolder}
      {showDeleteAlert ? (
        <Alert
          className="w-[430px] fixed top-[20px] right-[17px] z-10"
          message="This Issue is Closed"
          description="Would to like to Delete this Issue"
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary" onClick={handleClick}>
                Accept
              </Button>
            </Space>
          }
          closable
        />
      ) : null}
      {issueData[0] &&
        (issueData[0].length > 0 ? (
          <>
            <h1 className="font-extralight text-xl capitalize">
              {issueData[0][0].title}
            </h1>
            <TimeLine
              status={issueData[0][0].status}
              setShowDeleteAlert={setShowDeleteAlert}
            />
          </>
        ) : (
          <h1 className="flex justify-center items-center text-xl fonr-normal">
            No Issue Posted yet{" "}
          </h1>
        ))}
    </>
  );
}

export default EmployeeStatus;
