import Character from "../components/Character";
import Loading from "../components/Loading";
import { useDataContext } from "../context/context";
const CharacterList = () => {
  const { data, isLoading, page } = useDataContext();
  console.log("data", data);
  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    const {
      info: { count, pages },
    } = data;
    if (data.results.length < 1) {
      return (
        <h2 className="section-title">
          no characters matched your search criteria
        </h2>
      );
    }
    return (
      <section className="section">
        <h2 className="section-title">characters</h2>
        <div className="section-results">
          <h3>{`Showing ${page} to ${pages} of ${count} results`}</h3>
        </div>
        <div className="characters-center">
          {data.results.map((item) => {
            return <Character key={item.id} {...item} />;
          })}
        </div>
      </section>
    );
  }
};
export default CharacterList;
