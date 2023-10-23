import React, { useEffect, useState } from "react";
import Profile from "../Form/Profile";
import { ProfileCard } from "../Card";
import { useGet } from "../../hooks/useGet";

export const DepartmentProfile = () => {
  const {
    getData: getUserData,
    data: userData,
    isLoading: userDataLoading,
    error: userdataError,
  } = useGet();

  useEffect(() => {
    async function fetch() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log("user :", user);
      await getUserData(`http://localhost:8087/api/department/${user.id}`);
    }
    fetch();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("User Data :", userData[0]);
    }
  }, [userData]);
  return (
    <div className="flex justify-around items-start w-full">
      <Profile />
      {userData.length > 0 && <ProfileCard userData={userData} />}
    </div>
  );
};
