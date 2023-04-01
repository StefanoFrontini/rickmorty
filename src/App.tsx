import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, Error, Favorites } from "./pages/index";
import Modal from "./components/Modal";
import Header from "./components/Header";
const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Header />
      <Routes location={background || location}>
        <Route path="/" element={<Dashboard />}>
          <Route path="/modal" element={<Modal />} />
        </Route>
        <Route path="favorites" element={<Favorites />} />
        <Route path="*" element={<Error />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="modal" element={<Modal />} />
        </Routes>
      )}
    </>
  );
};

export default App;
