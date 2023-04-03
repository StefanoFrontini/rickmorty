import { useDataContext } from "../context/context";

import { useRef, useEffect } from "react";
const SearchForm = () => {
  const { searchCharacterName } = useDataContext();
  const searchValue = useRef<HTMLInputElement>(null);
  let timer: number | null = null;

  useEffect(() => {
    searchValue.current && searchValue.current.focus();
  }, []);

  const searchCharacter = () => {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchValue.current && searchCharacterName(searchValue.current.value);
      }, 500);
    } else {
      timer = setTimeout(() => {
        searchValue.current && searchCharacterName(searchValue.current.value);
      }, 500);
    }
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite character</label>
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={searchCharacter}
          />
        </div>
      </form>
    </section>
  );
};
export default SearchForm;
