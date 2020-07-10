import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import App from '../App';

describe("Book Finder Application", () => {
  it("User can enter a search query into an `input` field", () => {
    const { getByLabelText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'testing a search query' }});
    expect(input.value).toEqual('testing a search query');
  });
  it("User can submit the search query", () => {});
  it("User can see the list of books appearing on the page", () => {});
  it("For each item in the list add a link that will send the User to an external site which has more information about the book", () => {});
  it("Supports loading animations", () => {});
});