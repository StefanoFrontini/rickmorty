import React, { ReactNode, useState } from "react";
import { useFetchCharacter } from "../hooks/useFetchCharacter";
import type { Character } from "rickmortyapi";
import type { ApiData } from "../hooks/useFetchCharacter";

interface Props {
  children?: ReactNode;
}

export interface ErrorType {
  show: Boolean;
  msg: string;
}

interface DataContextType {
  data: ApiData | null;
  isLoading: Boolean;
  errorData: ErrorType;
  page: string;
  changePage: (url: string) => void;
  searchCharacterName: (name: string) => void;
  toggleFavorites: (character: Character) => void;
  favorites: Character[];
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  favoritesDB: Map<any, any>;
  setFavoritesDB: React.Dispatch<React.SetStateAction<Map<any, any>>>;
}
const baseUrl = "https://rickandmortyapi.com/api/character";

const DataContext = React.createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<Props> = ({ children }) => {
  const [page, setPage] = useState("1");
  const [url, setUrl] = useState(baseUrl);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [favoritesDB, setFavoritesDB] = useState(new Map());
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading, error: errorData } = useFetchCharacter(url);
  console.log(data);

  const searchCharacterName = (name: string) => {
    const url = `${baseUrl}/?name=${name}`;
    setUrl(url);
  };

  const changePage = (url: string) => {
    const regex = /page=([1-9]+)/;
    const page = url.match(regex)![1];
    setPage(page);
    setUrl(url);
  };

  const toggleFavorites = (character: Character) => {
    if (favoritesDB.has(character.id)) {
      const newFavorites = favorites.filter((el) => el.id !== character.id);
      favoritesDB.delete(character.id);
      const newDB = new Map(favoritesDB);

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
        page,
        changePage,
        searchCharacterName,
        toggleFavorites,
        favorites,
        searchValue,
        setSearchValue,
        favoritesDB,
        setFavoritesDB,
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
