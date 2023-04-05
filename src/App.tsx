import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, ErrorPage, Favorites } from "./pages/index";
import { CharacterDetail } from "./pages/index";
import Header from "./components/Header";
import { useDataContext } from "./context/context";
import Error from "./components/Error";
const App = () => {
  const { error } = useDataContext();
  const location = useLocation();
  const background = location.state && location.state.background;
  if (error.show) {
    return <Error {...error} />;
  }
  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Dashboard />}>
          <Route path="character-detail" element={<CharacterDetail />} />
        </Route>
        <Route path="/favorites" element={<Favorites />}>
          <Route path="character-detail" element={<CharacterDetail />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="character-detail" element={<CharacterDetail />} />
          <Route path="/favorites" element={<Favorites />}>
            <Route path="character-detail" element={<CharacterDetail />} />
          </Route>
        </Routes>
      )}
    </>
  );
};

export default App;
