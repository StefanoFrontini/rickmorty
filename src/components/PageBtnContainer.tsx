import { useDataContext } from "../context/context";

const PageBtnContainer = () => {
  const { changePage, data } = useDataContext();
  if (data) {
    const { info } = data;

    return (
      <div>
        {info?.prev && (
          <button
            type="button"
            className="prev-btn"
            onClick={() => changePage(info.prev)}
          >
            {/* <HiChevronDoubleLeft /> */}
            prev
          </button>
        )}{" "}
        {info?.next && (
          <button
            type="button"
            className="next-btn"
            onClick={() => changePage(info.next)}
          >
            next
            {/* <HiChevronDoubleRight /> */}
          </button>
        )}
      </div>
    );
  }
};
export default PageBtnContainer;
