import { useEffect, useState } from "react";
import axios from "axios";
import type { ApiResponse, Character } from "rickmortyapi";

interface Info {
  count: number;
  next: null | string;
  pages: number;
  prev: null | string;
}
export interface ApiData extends ApiResponse<Character> {
  results: Character[] | [];
  info: Info;
}

export const useFetchCharacter = (url: string) => {
  const [data, setData] = useState<ApiData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });

  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  useEffect(() => {
    const getData = async () => {
      toggleError();
      setIsLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err: any) {
        console.log(err);
        if (err?.response?.data?.error === "There is nothing here") {
          const emptyData: ApiData = {
            status: 404,
            statusMessage: "Request failed with status code 404",
            results: [],
            data: {
              id: 0,
              gender: "unknown",
              image: "",
              location: { name: "", url: "" },
              name: "",
              origin: { name: "", url: "" },
              species: "",
              status: "unknown",
              type: "",
              url: "",
              episode: [""],
              created: "",
            },
            info: {
              count: 0,
              pages: 0,
              next: null,
              prev: null,
            },
          };
          setData(emptyData);
          setIsLoading(false);
          return;
        } else {
          toggleError(true, "oops! something went wrong!");
        }
      }
      setIsLoading(false);
    };

    getData();
  }, [url]);

  return { data, isLoading, error };
};
