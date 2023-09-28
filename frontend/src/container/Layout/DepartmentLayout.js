import React, { useState, useEffect } from "react";
import { DepartmentMenu } from "../../components/Menu";
import { IssueCard } from "../../components/Card";
import { EmployeeProfile } from "../../components/Profile";
import { TimeLine } from "../../components/TimLine";
import { Nav } from "../../components/NavBar";
import { Layout, Menu, Button, theme, Alert, Space } from "antd";
import { useGet } from "../../hooks/useGet";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const { Header, Sider, Content } = Layout;
export function DepartmentLayout() {
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
  const { isAuth, isLoading } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isCloseIssue, setIsCloseIssue] = useState(false);

  const IssueCards = ({ post }) => {
    console.log(post[0], "post");
    return (
      <Content className="grid grid-cols-3 items-center gap-6 space-y-3 justify-items-center">
        {post.length > 0 &&
          post[0].map((value, idx) => (
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
      </Content>
    );
  };
  const components = {
    1: <IssueCards post={issueData} showAlert={showAlert} />,
    2: <EmployeeProfile />,
  };
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  if (isCloseIssue) {
    // update isClose in db
  }

  useEffect(() => {
    async function fetch() {
      await isAuth("ADMIN");
      const user = localStorage.getItem("user");
      const data = JSON.parse(user);
      if (user) {
        setIsLoggedIn(true);
      }
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
      {isLoggedIn ? (
        <Nav menu={<DepartmentMenu handleClick={handleMenuClick} />}>
          <Content>{components[render]}</Content>
        </Nav>
      ) : (
        <Loading />
      )}
    </>
  );
}
