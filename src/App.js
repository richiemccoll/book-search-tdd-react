import React from "react";
import { atom, useRecoilState, RecoilRoot } from "recoil";

const searchInputState = atom({
  key: "searchInputState",
  value: "",
});

function SearchInput() {
  const [searchInput, setSearchInput] = useRecoilState(searchInputState);
  
  function onChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <form>
      <label htmlFor="book-search">Search for a book</label>
      <input
        id="book-search"
        type="text"
        value={searchInput}
        onChange={onChange}
      />
    </form>
  );
}

function App() {
  return (
    <RecoilRoot>
      <main>
        <section data-test-id="search">
          <SearchInput />
        </section>

        <section data-test-id="results"></section>
      </main>
    </RecoilRoot>
  );
}

export default App;
