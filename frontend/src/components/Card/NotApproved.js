import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGet } from "../../hooks/useGet";

export const NotApproved = ({ id }) => {
  const { getData, data, isLoading, error } = useGet();

  useEffect(() => {
    async function fetch() {
      await getData(`http://localhost:8087/api/issues/${id}`);
    }
    fetch();
  }, [id]);

  //   const status = [
  //     {
  //       color: "blue",
  //       children: `Viewed Issue at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  //     },
  //     {
  //       color: "yellow",
  //       dot: "(IssuesCloseOutlined)",
  //       children: `Not Allowed Issue to Respective Department at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  //     },
  //     {
  //       color: "red",
  //       dot: "(CloseCircleOutlined)",
  //       children: `Closed Issues at ${new Date().toLocaleDateString()} at ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  //     },
  //   ];

  //   if (data) {
  //     console.log(data);
  //   }

  //   return <div></div>;
};
