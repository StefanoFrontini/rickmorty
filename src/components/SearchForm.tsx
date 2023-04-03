import { useDataContext } from "../context/context";

import { useRef, useEffect } from "react";

const SearchForm = () => {
  const { searchCharacterName, searchValue, setSearchValue } = useDataContext();
  const searchValueRef = useRef<HTMLInputElement>(null);
  let timerRef = useRef("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (timerRef.current) {
      clearTimeout(+timerRef.current);
    }
    const timer = setTimeout(() => {
      searchCharacterName(e.target.value);
    }, 1000);
    timerRef.current = timer.toString();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (searchValueRef.current) {
      searchValueRef.current.focus();
    }
  }, []);

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="search">search your favorite character</label>
          <input
            type="text"
            name="search"
            id="search"
            value={searchValue}
            onChange={handleChange}
          />
        </div>
      </form>
    </section>
  );
};
export default SearchForm;
