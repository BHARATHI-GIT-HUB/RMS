import React, { useState, useEffect } from "react";
import Profile from "../Form/Profile";
import { ProfileCard } from "../Card";
import { useGet } from "../../hooks/useGet";

let user = undefined;
export const EmployeeProfile = () => {
  const {
    getData: getUserData,
    data: userData,
    isLoading: userDataLoading,
    error: userdataError,
  } = useGet();

  useEffect(() => {
    async function fetch(user) {
      await getUserData(`http://localhost:8087/api/employee/${user.id}`);
    }
    user = JSON.parse(localStorage.getItem("user"));
    fetch(user);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-around items-center w-full md:h-[75vh]">
      <Profile />
      <div className="sm:block hidden">
        {userData.length > 0 && (
          <ProfileCard userData={userData} userName={"user"} />
        )}
      </div>
    </div>
  );
};
