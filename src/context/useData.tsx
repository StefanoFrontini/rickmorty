import { useEffect, useState } from "react";
import axios from "axios";

// interface APIData {
// }
//
// export interface CleanData {
// }
// interface Props {
//   url: string;
// }

export const useData = (url: string) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        console.log(err);
        toggleError(true, "Error!");
        setData({ results: [] });
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};
