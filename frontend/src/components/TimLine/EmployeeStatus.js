import React, { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";
import { useDelete } from "../../hooks/useDelete";
import Loading from "../Loading";
import { TimeLine } from ".";
import { Alert, Button, Space } from "antd";
import Notification from "../Notification";

function EmployeeStatus() {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
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

  const handleClick = () => {
    async function fetch() {
      //  const user = JSON.parse(localStorage.getItem("user"));
      // await getUserData(`http://localhost:8087/api/employee/${user.id}`);
      // await getData(`http://localhost:8087/api/issues/employee/${user.id}`);
    }
    fetch();
  };

  useEffect(() => {
    async function fetch() {
      const user = JSON.parse(localStorage.getItem("user"));
      await getUserData(`http://localhost:8087/api/employee/${user.id}`);
      // await getData(`http://localhost:8087/api/issues/employee/${user.id}`);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      console.log("userData", userData[0].id);
      await getIssueData(
        `http://localhost:8087/api/issues/employee/${userData[0].id}`
      );
    }
    if (userData && userData.length > 0) {
      fetch();
    }
  }, [userData]);

  if (issueData.length > 0) {
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
  if (issueDataLoading || userDataLoading) {
    return <Loading />;
  }

  if (issueError || userdataError) {
    return (
      <Alert message={issueError ? issueError : userdataError} type="error" />
    );
  }

  return (
    <>
      {showDeleteAlert && (
        <Alert
          className="w-[430px] fixed top-[98px] right-[17px] z-10"
          message="This Issue is Closed"
          description="Would to like to Delete this Issue"
          type="info"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary" onClick={handleClick}>
                Accept
              </Button>
              {/* <Button size="small" danger ghost>
                Decline
              </Button> */}
            </Space>
          }
          closable
        />
      )}
      {issueData && issueData.length > 0 && (
        <TimeLine
          status={issueData[0][0].status}
          setShowDeleteAlert={setShowDeleteAlert}
        />
      )}
    </>
  );
}

export default EmployeeStatus;
