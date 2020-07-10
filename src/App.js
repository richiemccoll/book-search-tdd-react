import React, { useState } from "react";
import services from "./services";

function SearchInput({ onSubmit }) {
  const [searchInput, setSearchInput] = useState("");
  function onChange(e) {
    setSearchInput(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (searchInput) {
      onSubmit(searchInput);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
  const [results, setResults] = useState([]);
  function handleSubmit(query) {
    return services
      .callBooksService(query)
      .then((data) => setResults(data.items));
  }
  return (
    <main>
      <section data-test-id="search">
        <SearchInput onSubmit={handleSubmit} />
      </section>

      <section data-test-id="results">
        {results.map((result) => (
          <article key={result.id}>
            <img alt={result.volumeInfo.title} />
            <h1>{result.volumeInfo.title}</h1>
            {result.volumeInfo.authors.map(author => (
              <span key={author}>{author}</span>
            ))}
            <span>{result.volumeInfo.publishedDate}</span>
            <a href={result.volumeInfo.infoLink}>Find out more</a>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
