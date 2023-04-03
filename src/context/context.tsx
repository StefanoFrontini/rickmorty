import React, { ReactNode, useState } from "react";
import { useData } from "./useData";
// import type { CleanData } from "./useData";

interface Props {
  children?: ReactNode;
}

export interface ErrorType {
  show: Boolean;
  msg: string;
}

interface DataContextType {
  data: any;
  isLoading: Boolean;
  errorData: ErrorType;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
const baseUrl = "https://rickandmortyapi.com/api/character";
// const favoritesDB = new Map();

const DataContext = React.createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<Props> = ({ children }) => {
  const [characterDetail, setCharacterDetail] = useState({});
  const [page, setPage] = useState("1");
  const [url, setUrl] = useState(baseUrl);
  const [favorites, setFavorites] = useState([]);
  const [favoritesDB, setFavoritesDB] = useState(new Map());

  const { data, isLoading, error: errorData } = useData(url);
  console.log(data);

  const searchCharacterName = (name: string) => {
    const url = `${baseUrl}/?name=${name}`;
    setUrl(url);
  };

  const changePage = (url: string) => {
    const regex = /page=([1-9]+)/;
    const page = url.match(regex)![1];
    setPage(page);
    console.log(page);
    setUrl(url);
  };

  const toggleFavorites = (character) => {
    if (favoritesDB.has(character.id)) {
      const newFavorites = favorites.filter((el) => el.id !== character.id);
      const newDB = favoritesDB.delete(character.id);
      setFavorites(newFavorites);
      setFavoritesDB(newDB);
    } else {
      const newDB = favoritesDB.set(character.id, true);
      const newFavorites = [...favorites, character];
      setFavorites(newFavorites);
      setFavoritesDB(newDB);
    }
  };
  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        errorData,
        setCharacterDetail,
        characterDetail,
        page,
        changePage,
        searchCharacterName,
        toggleFavorites,
        favorites,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = () => {
  const dataContext = React.useContext(DataContext);
  if (!dataContext)
    throw new Error(
      "No DataContext.Provider found when calling useDataContext."
    );
  return dataContext;
};

export { useDataContext, DataProvider };
