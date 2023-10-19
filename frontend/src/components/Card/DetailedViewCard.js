import React from "react";
import { Card } from "antd";
import { Status } from "../DropDown";

const { Meta } = Card;

export function DetailedViewCard({ value }) {
  console.log("value :", value);
  return (
    <>
      <Card
        className="flex flex-col justify-center mt-10"
        hoverable
        style={{
          width: 370,
        }}
        cover={
          <img
            alt="example"
            src={`http://localhost:8087/images/` + value.photo}
            className="h-[250px] object-center"
          />
        }
        actions={[<Status id={value.id} />, <Meta description={value.place} />]}
      >
        <Meta
          className="text-center"
          title={value.title}
          description={value.description}
        />
      </Card>
    </>
  );
}
