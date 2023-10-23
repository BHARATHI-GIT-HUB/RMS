import React from "react";

export function ProfileCard({ userData }) {
  console.log(userData[0].department_name, "in module");
  return (
    <div class="w-full md:max-w-[250px]  bg-blue-500 dark:bg-blue-500 rounded-lg overflow-hidden shadow-2xl mt-9">
      <div class="border-b px-3 pb-6">
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
            <div className="flex justify-end gap-4">
              <div className="flex flex-col items-end text-gray-700 dark:text-gray-300 gap-3">
                <p>Name:</p>
                <p>Email:</p>
                <p>Phone:</p>
              </div>
              <div className="flex flex-col items-end text-gray-700 dark:text-gray-300 gap-3">
                <p>
                  {userData[0].name != undefined
                    ? userData[0].name
                    : "user name"}
                </p>
                <p>
                  {userData[0].email != undefined
                    ? userData[0].email
                    : "user name"}
                </p>
                <p>
                  {userData[0].phone != undefined
                    ? userData[0].name
                    : "xxxxxxxx"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
