import React, { useState } from 'react';

export default function SearchInput({ onSubmit }) {
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