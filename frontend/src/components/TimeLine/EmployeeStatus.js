import React, { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import Loading from "../Loading";
import { TimeLine } from ".";
import { Alert, Button, Space, notification } from "antd";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8087");

function EmployeeStatus() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [issueData, setIssueData] = useState([]);

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Deleted Successfully",
      description: "Issue is Deleted Successfully",
    });
  };

  const {
    getData: getUserData,
    data: userData,
    isLoading: userDataLoading,
    error: userDataError,
  } = useGet();

  const {
    getData: getIssueData,
    data: issueDataFromServer,
    isLoading: issueDataLoading,
    error: issueDataError,
  } = useGet();

  const {
    DeleteData,
    response,
    isLoading: deleteLoading,
    error: deleteError,
  } = useDelete();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      await getUserData(`http://localhost:8087/api/employee/${user.id}`);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchIssueData = async () => {
      if (userData && userData.length > 0) {
        await getIssueData(
          `http://localhost:8087/api/issues/employee/${userData[0].id}`
        );
      }
    };

    fetchIssueData();
  }, [userData]);

  useEffect(() => {
    socket.on("updated_issue_data", (data) => {
      setIssueData((prevData) => [[data]]);
      console.log(
        data,
        data.status.some((item) => item?.children?.includes("Closed"))
      );
    });
  }, [socket]);

  useEffect(() => {
    if (issueDataFromServer[0] && issueDataFromServer[0].length > 0) {
      setIssueData((prevData) => [...prevData, ...issueDataFromServer]);
    }
    // console.log(issueData[0]);

    // if (
    //   issueData[0] &&
    //   issueData[0].length > 0 &&
    //   issueData[0][0].status.some((item) => item?.children?.includes("Closed"))
    // ) {
    //   setShowDeleteAlert(true);
    // }
  }, [issueDataFromServer]);

  useEffect(() => {
    if (issueData[0]) {
      console.log(
        issueData[0][0].status.some((item) =>
          item?.children?.includes("Closed")
        )
      );
    }
    if (
      issueData[0] &&
      issueData[0].length > 0 &&
      issueData[0][0].status.some((item) => item?.children?.includes("Closed"))
    ) {
      setShowDeleteAlert(true);
    }
  }, [issueData]);

  const handleDelete = async () => {
    setShowDeleteAlert(false);
    openNotificationWithIcon("success");
    setTimeout(async () => {
      await DeleteData(
        `http://localhost:8087/api/issues/${issueData[0][0].id}`
      );
    }, 1000);
  };

  if (userDataLoading || issueDataLoading || deleteLoading) {
    return <Loading />;
  }

  if (userDataError || issueDataError || deleteError) {
    return (
      <Alert
        message={userDataError || issueDataError || deleteError}
        type="error"
      />
    );
  }

  if (response) {
    window.location.reload(false);
  }

  return (
    <>
      {contextHolder}
      {showDeleteAlert && (
        <Alert
          className="w-[430px] fixed top-[20px] right-[17px] z-10"
          message="This Issue is Closed"
          description="Would you like to Delete this Issue"
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary" onClick={handleDelete}>
                Accept
              </Button>
            </Space>
          }
          closable
        />
      )}
      {issueData[0] ? (
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
          No Issue Posted yet
        </h1>
      )}
    </>
  );
}

export default EmployeeStatus;
