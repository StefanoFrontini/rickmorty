import { Outlet, useLocation } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import CharacterList from "../components/CharacterList";
import { useDataContext } from "../context/context";
import PageBtnContainer from "../components/PageBtnContainer";
// import ResultsStats from "../components/ResultsStats";
const Dashboard = () => {
  const location = useLocation();
  const { data, isLoading } = useDataContext();
  // if (data?.results.length < 1) {
  //   return (
  //     <h2 className="section-title">
  //       no characters matched your search criteria
  //     </h2>
  //   );
  // }
  return (
    <>
      <Outlet />
      <main>
        <SearchForm />
        {data && <CharacterList data={data} />}
        {data && <PageBtnContainer />}
      </main>
    </>
  );
};
export default Dashboard;
