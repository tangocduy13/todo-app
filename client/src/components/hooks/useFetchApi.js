import { useState, useEffect } from "react";
import axiosTodo from "../helpers/api/axiosTodo"

const useFetchApi = ({ url }) => {
  const [data, setData] = useState([]);
  console.log(url)
  useEffect(() => {
    async function fetchApi() {
      try {
        const response = await axiosTodo.get(url);
        setData(response.data);
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
