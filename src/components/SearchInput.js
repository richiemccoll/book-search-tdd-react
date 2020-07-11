import React, { useState } from "react";

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
    <form className="rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="book-search"
      >
        Search for a book
      </label>
      <input
        id="book-search"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={searchInput}
        onChange={onChange}
      />
    </form>
  );
}
