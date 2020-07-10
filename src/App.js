import React, { useState } from "react";

function SearchInput() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <form>
      <label htmlFor="book-search">Search for a book</label>
      <input
        id="book-search"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </form>
  );
}

function App() {
  return (
    <main>
      <section data-test-id="search">
        <SearchInput />
      </section>

      <section data-test-id="results"></section>
    </main>
  );
}

export default App;
