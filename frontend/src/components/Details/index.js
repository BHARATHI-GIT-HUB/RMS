import React, { useState } from "react";
import { Button, Dropdown } from "antd";

export const Details = ({ name, description, place, currstatus }) => {
  const [status, setstatus] = useState(currstatus);
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.antgroup.com"
          onClick={() => setstatus("approvaed")}
        >
          approvaed
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          // href="https://www.aliyun.com"
          onClick={() => setstatus("Not approvaed")}
        >
          Not approvaed
        </a>
      ),
    },
  ];
  return (
    <div className="flex justify-center items-center h-screen">
      <div className=" flex justify-between items-start gap-20 border-2 border-stone-300 rounded-lg min-w-[1300px] max-w-[1300px] p-20">
        <img src={""} alt="" srcset="" className="" />
        <div className="flex flex-col justify-start min-w-[600px] min-h-[308px] gap-16">
          <div className="flex justify-between items-center">
            {/* <h1 className="font-bold text-3xl">{name}</h1> */}
            <h1 className="font-bold text-3xl">name</h1>
            <p>desk</p>
            {/* <h1>{name}</h1>
            <p>{place}</p> */}
          </div>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
            impedit asperiores cum architecto commodi repudiandae tempora. Sequi
            ullam illum fuga, iure magnam quibusdam officia incidunt libero non
            eum. Deleniti, fugiat.
          </div>
          {/* <div>{description}</div> */}
          <Dropdown
            menu={{
              items,
            }}
            placement="bottom"
            arrow={{
              pointAtCenter: true,
            }}
          >
            <Button>{status}</Button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};
