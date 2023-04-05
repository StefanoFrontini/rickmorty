import { useEffect, useState } from "react";
import axios from "axios";
import type { Episode } from "rickmortyapi";

export const useFetchEpisode = (url: string) => {
  const [data, setData] = useState<Episode[] | null>(null);
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
        toggleError();
        setData(data);
      } catch (err) {
        console.log(err);
        toggleError(true, "oops! something went wrong!");
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};
