import Character from "../components/Character";
import { useDataContext } from "../context/context";

const FavoritesList = () => {
  const { favorites } = useDataContext();
  if (favorites.length < 1) {
    return (
      <section className="section">
        <h1 className="section-title">no favorite characters</h1>
      </section>
    );
  }
  return (
    <section className="section">
      <h1 className="section-title">favorites</h1>
      <div className="section-results">
        <h4>
          {favorites.length === 1
            ? `${favorites.length} result`
            : `${favorites.length} results`}
        </h4>
      </div>
      <div className="characters-center">
        {favorites.map((item) => {
          return <Character key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};
export default FavoritesList;
