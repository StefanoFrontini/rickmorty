import Character from "../components/Character";
import { useDataContext } from "../context/context";
const FavoritesList = () => {
  const { favorites } = useDataContext();
  // const {
  //   info: { count, pages },
  // } = data;
  if (favorites.length < 1) {
    return <h2 className="section-title">no favorites characters</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">favorites</h2>
      <div className="section-results">
        <h3>{favorites.length} results</h3>
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