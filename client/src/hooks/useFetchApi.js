import { useState, useEffect } from "react";

function useFetchApi(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function fetchData() {
    try {
      setLoading(true);
      const res = await fetch(url);
      const resData = await res.json();
      console.log(resData);
      setData(resData);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [data]);

  return {
    data,
    setData,
    loading,
  };
}

export default useFetchApi;
