import React, { useState, useEffect } from "react";
import { EmployeeMenu } from "../../components/Menu";
import { IssueForm } from "../../components/Form";
import { EmployeeProfile } from "../../components/Profile";
import { TimeLine } from "../../components/TimLine";
import { Nav } from "../../components/NavBar";
import { Layout, Menu, Button, theme } from "antd";
import { useGet } from "../../hooks/useGet";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const { Header, Sider, Content } = Layout;

export function EmployeeLayout() {
  const { getData, data, isloading, error } = useGet();
  const { isAuth, isLoading } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currData, setCurrData] = useState();

  const components = {
    1: <IssueForm />,
    2: <EmployeeProfile />,
    3: data && data.length > 0 && <TimeLine status={data[0].status} />,
  };
  const [render, updateRender] = useState(1);

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  // useEffect(async () => {
  //   await isAuth("EMPLOYEE");
  //   await getData("http://localhost:8087/api/issues/1");
  //   if (localStorage.getItem("token")) {
  //     setIsLoggedIn(true);
  //   }
  //   return () => {
  //     console.log("got data");
  //   };
  // }, []);

  useEffect(() => {
    async function fetch() {
      await isAuth("EMPLOYEE");
      await getData("http://localhost:8087/api/issues/3");
    }
    fetch();
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      // setIsLoggedIn(true);
      console.log(data[0].status, "in emp");
    }
  }, [data]);

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <>
      {isLoggedIn ? (
        <Nav menu={<EmployeeMenu handleClick={handleMenuClick} />}>
          <Content>{components[render]}</Content>
        </Nav>
      ) : (
        <Loading />
      )}
    </>
  );
}
