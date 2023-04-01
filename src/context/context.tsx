import React, { ReactNode } from "react";
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
}

const DataContext = React.createContext<DataContextType | undefined>(undefined);

const DataProvider: React.FC<Props> = ({ children }) => {
  const { data, isLoading, error: errorData } = useData();
  console.log(data);

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        errorData,
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
