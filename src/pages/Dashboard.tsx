import { Link, Outlet, useLocation } from "react-router-dom";
import Search from "../components/Search";
import CharacterList from "../components/CharacterList";
const Dashboard = () => {
  const location = useLocation();
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="modal" state={{ background: location }}>
        Open Modal
      </Link>
      <Outlet />
      <Search />
      <CharacterList />
    </>
  );
};
export default Dashboard;
