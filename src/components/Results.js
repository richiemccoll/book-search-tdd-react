import React from "react";

export default function Results({ results }) {
  if (results && results.length > 0) {
    return results.map((result) => (
      <article className="p-4 md:w-1/3 sm:mb-0 mb-6" key={result.id}>
        <div className="rounded-lg h-64 overflow-hidden">
          <img
            className="object-cover object-center h-full w-full"
            alt={result.volumeInfo.title}
            src={result.volumeInfo.imageLinks.thumbnail}
          />
        </div>
        <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
          {result.volumeInfo.title}
        </h2>
        <span className="mr-2" key={result.volumeInfo.authors[0]}>
          {result.volumeInfo.authors[0]}
        </span>
        <p className="text-base leading-relaxed mt-2">
          Published Date - {result.volumeInfo.publishedDate}
        </p>
        <a
          className="text-indigo-500 inline-flex items-center mt-3"
          href={result.volumeInfo.infoLink}
        >
          Find out more
        </a>
      </article>
    ));
  }
  return null;
}
