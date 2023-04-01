import { useEffect, useState } from "react";
import axios from "axios";

const url = "https://rickandmortyapi.com/api/character";

// interface APIData {
// }
//
// export interface CleanData {
// }

export const useData = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    // const myRegex = /-*[0-9]+\.*[0-9]*/g;

    const getData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (error) {
        console.log(error);
        toggleError(true, "Error!");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  return { data, isLoading, error };
};
