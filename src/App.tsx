import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, Error, Favorites } from "./pages/index";
import { CharacterDetail } from "./pages/index";
import Header from "./components/Header";
const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
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
        <Route path="*" element={<Error />} />
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
