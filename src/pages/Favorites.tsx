import { Outlet } from "react-router-dom";

import FavoritesList from "../components/FavoritesList";
const Favorites = () => {
  return (
    <>
      <Outlet />
      <FavoritesList />
    </>
  );
};
export default Favorites;
