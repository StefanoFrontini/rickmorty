import Character from "../components/Character";
import Loading from "../components/Loading";
import { useDataContext } from "../context/context";
const CharacterList = () => {
  const { data, isLoading, page, changePage } = useDataContext();
  console.log("data", data);
  if (isLoading) {
    return <Loading />;
  }
  if (data) {
    if (data.results.length < 1) {
      return (
        <section className="section">
          <h2 className="section-title">
            no characters matched your search criteria
          </h2>
        </section>
      );
    }
    const { info } = data;
    return (
      <section className="section">
        <h1 className="section-title">characters</h1>
        <div className="section-results">
          <h4>{`Showing ${page} to ${info.pages} of ${info.count} results`}</h4>
        </div>
        <div className="characters-center">
          {data.results.map((item) => {
            return <Character key={item.id} {...item} />;
          })}
        </div>
        <div className="pagination">
          {info?.prev && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => changePage(info.prev!)}
            >
              prev
            </button>
          )}{" "}
          {info?.next && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => changePage(info.next!)}
            >
              next
            </button>
          )}
        </div>
      </section>
    );
  }
  return <></>;
};
export default CharacterList;
