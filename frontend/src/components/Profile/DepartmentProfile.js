import React, { useEffect, useState } from "react";
import Profile from "../Form/Profile";
import { ProfileCard } from "../Card";
import { useGet } from "../../hooks/useGet";

let user = undefined;
export const DepartmentProfile = () => {
  const {
    getData: getUserData,
    data: userData,
    isLoading: userDataLoading,
    error: userdataError,
  } = useGet();
  const [user, setUser] = useState();

  useEffect((user) => {
    async function fetch() {
      await getUserData(`http://localhost:8087/api/department/${user.id}`);
    }
    user = JSON.parse(localStorage.getItem("user"));
    fetch(user);
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("User Data :", userData[0]);
    }
  }, [userData]);
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
