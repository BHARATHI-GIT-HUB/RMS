import React from "react";

export function ProfileCard({ userData, userName }) {
  return (
    <div class="bg-blue-500 dark:bg-blue-500 rounded-lg overflow-hidden shadow-2xl px-4 mx-3">
      <div class="border-b px-2 pb-6 ">
        <div class="text-center my-4 flex flex-col justify-center items-center">
          <img
            class="h-25 w-25 rounded-full border-2 border-white dark:border-slate-300 "
            src="https://randomuser.me/api/portraits/women/21.jpg"
            alt=""
          />
          <div class="py-2">
            <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1  capitalize py-1">
              {userData[0].department_name != undefined
                ? userData[0].department_name
                : userData[0].designation}
            </h3>
            <div className="flex items-center justify-center gap-4">
              <div className="md:flex flex-col text-gray-700 dark:text-gray-300 gap-3 hidden ">
                <div className="flex justify-start items-start gap-2">
                  <p>Name:</p>
                  <p>{userName ? userName : "User Name"}</p>
                </div>
                <div className="flex justify-start  items-center gap-2">
                  <p>Email:</p>

                  <p>
                    {userData[0].email != undefined
                      ? userData[0].email
                      : "user name"}
                  </p>
                </div>

                <div className="flex justify-start  items-center gap-2">
                  <p>Phone:</p>
                  <p>
                    {userData[0].phone != undefined
                      ? userData[0].phone
                      : "xxxxxxxx"}
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col items-end text-gray-700 dark:text-gray-300 gap-3 capitalize">
                
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
