import React, { useEffect } from "react";
import { Nav } from "../NavBar";
import { Card, Avatar, Skeleton } from "antd";
import { Status } from "../DropDown";
import { TimeLine } from "../TimLine";
import { useGet } from "../../hooks/useGet";
import { useParams } from "react-router-dom";
import { DetailedViewCard } from "../Card";

function Index() {
  const { getData, data, isLoading, error } = useGet();
  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      await getData(`http://localhost:8087/api/issues/${id}`);
    }
    fetch();
  }, [0]);

  return (
    <div className="flex justify-evenly items-start w-full h-full">
      {data.length > 0 && (
        <>
          <DetailedViewCard value={data[0]} />
          <div className="md:block hidden mx-3">
            <TimeLine status={data[0].status} />
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
