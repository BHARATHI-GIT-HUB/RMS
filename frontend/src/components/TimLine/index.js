import React from "react";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Timeline } from "antd";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { SmileOutlined } from "@ant-design/icons";

const queryClient = new QueryClient();

export const TimeLine = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Status />
    </QueryClientProvider>
  );
};

const Status = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("http://localhost:8087/api/issues/4").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  // progress.push(
  //   {
  //     children: "Viewed Issue 2015-09-01",
  //   },
  //   {
  //     children: "Informed to respective department 2015-09-01",
  //     color: "green",
  //   },
  //   {
  //     dot: (
  //       <ClockCircleOutlined
  //         style={{
  //           fontSize: "16px",
  //         }}
  //       />
  //     ),
  //     children: `progress info.`,
  //   },
  //   {
  //     color: "red",
  //     children: "Expected solution Range 2015-09-01",
  //   },
  //   {
  //     children: "Issue Closed 2015-09-01",
  //   },
  //   {
  //     dot: (
  //       <ClockCircleOutlined
  //         style={{
  //           fontSize: "16px",
  //         }}
  //       />
  //     ),
  //     children: "Technical testing 2015-09-01",
  //   }
  // );

  // issue approval -> informed to respective department -> progress info -> expected day for solution
  // issue not approval -> reason -> issue closed
  return (
    <>
      <div className="mt-20"></div>
      <Timeline mode="alternate">
        {data.status.map((status, index) => (
          <Timeline.Item key={index} color={status.color}>
            {status.dot ? (
              <div className=" flex items-center gap-2">
                {status.dot == "ClockCircleOutlined" ? (
                  <>
                    <ClockCircleOutlined style={{ fontSize: "16px" }} />
                    {status.children}
                  </>
                ) : (
                  <>
                    <SmileOutlined
                      style={{ fontSize: "16px", color: `${status.color}` }}
                    />
                    {status.children}
                  </>
                )}
              </div>
            ) : (
              status.children
            )}
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};
