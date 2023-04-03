import { useDataContext } from "../context/context";

const ResultsStats = () => {
  const { data, page } = useDataContext();
  const {
    info: { count, pages },
  } = data;
  return <h3>{`Showing ${page} to ${pages} of ${count} results`}</h3>;
};
export default ResultsStats;
