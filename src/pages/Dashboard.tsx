import { Outlet } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import CharacterList from "../components/CharacterList";
const Dashboard = () => {
  return (
    <>
      <Outlet />
      <main>
        <SearchForm />
        <CharacterList />
      </main>
    </>
  );
};
export default Dashboard;
