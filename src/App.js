import React from 'react';

function App() {
  return (
    <main>
      <section data-test-id="search">
        <form>
          <label htmlFor="book-search">Search for a book</label>
          <input id="book-search" type="text" />
        </form>
      </section>

      <section data-test-id="results">

      </section>

    </main>
  );
}

export default App;
