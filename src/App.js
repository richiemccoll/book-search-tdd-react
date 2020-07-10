import React, { useState } from "react";

function App() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <main>
      <section data-test-id="search">
        <form>
          <label htmlFor="book-search">Search for a book</label>
          <input
            id="book-search"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </section>

      <section data-test-id="results"></section>
    </main>
  );
}

export default App;
