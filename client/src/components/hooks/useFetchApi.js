import { useState, useEffect } from "react";

const useFetchApi = (url) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchApi() {
      try {
        const resData = await (await fetch(url)).json();
        setData(resData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchApi();
  }, [url]);

  return {
    data,
    setData,
  };
};

export default useFetchApi;
