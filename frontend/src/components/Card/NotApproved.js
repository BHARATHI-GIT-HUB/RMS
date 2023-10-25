import React, { useEffect, useState } from "react";
import { useGet } from "../../hooks/useGet";

function NotApproved() {
  const [renderCount, setRenderCount] = useState(0);
  const { getData, data, isLoading, error } = useGet();

  useEffect(() => {
    async function fetch() {
      await getData("http://localhost:8087/api/employee");
    }

    fetch();
  }, [0]);

  useEffect(() => {
    if (data.length > 0) {
      setRenderCount((prevCount) => prevCount + 1); // Increment the render count
    }
  }, [data.length]);

  return (
    <div>
      <p>Render Count: {renderCount}</p>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {data.length > 0 &&
            data[0].map((item, index) => (
              <div key={index}>
                <li key={index}>{item.someProperty}</li>
                <h1>hello</h1>
              </div>
            ))}
        </ul>
      )}
    </div>
  );
}

export default NotApproved;
