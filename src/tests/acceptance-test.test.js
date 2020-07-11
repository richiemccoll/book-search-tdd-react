import React from "react";
import { render, fireEvent } from "@testing-library/react";

import services from "../services";
import mock from "../mocks/book-volumes.mock.json";
import App from "../App";
import { act } from "react-dom/test-utils";

describe("Book Finder Application", () => {
  let booksServiceMock;

  beforeEach(() => {
    booksServiceMock = jest.spyOn(services, "callBooksService");
  });

  afterEach(() => {
    booksServiceMock.mockRestore();
  });

  it("User can enter a search query into an `input` field", () => {
    const { getByLabelText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "testing a search query" } });
    expect(input.value).toEqual("testing a search query");
  });

  it("User can submit the search query", () => {
    const { getByLabelText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(input.value).toEqual("Harry Potter");

    fireEvent.submit(input);
    expect(booksServiceMock).toHaveBeenCalled();
    expect(booksServiceMock).toHaveBeenCalledWith("Harry Potter");
  });

  it("User cannot submit an empty search query", () => {
    const { getByLabelText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual("");

    fireEvent.submit(input);
    expect(booksServiceMock).not.toHaveBeenCalled();
  });

  it("User can see the list of books appearing on the page", async () => {
    booksServiceMock.mockImplementation(() => Promise.resolve(mock));
    const { getByLabelText, getByAltText, getAllByText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(input.value).toEqual("Harry Potter");

    await act(async () => fireEvent.submit(input));
    expect(booksServiceMock).toHaveBeenCalled();

    // Check for Title
    getAllByText("The Ultimate Harry Potter and Philosophy");
    // Check for Author
    getAllByText("William Irwin");
    getAllByText("Gregory Bassham");
    // Check for Published Date
    getAllByText("2010-08-13");
    // Check for Picture
    const image = getByAltText("The Ultimate Harry Potter and Philosophy");
    expect(image.src).toEqual(mock.items[0].volumeInfo.imageLinks.thumbnail);
  });

  it("For each item in the list add a link that will send the User to an external site which has more information about the book", async () => {
    booksServiceMock.mockImplementation(() => Promise.resolve(mock));
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(input.value).toEqual("Harry Potter");

    await act(async () => fireEvent.submit(input));
    expect(booksServiceMock).toHaveBeenCalled();
    const link = getByText("Find out more");
    expect(link.href).toEqual(mock.items[0].volumeInfo.infoLink);
  });

  it("should handle empty results", async () => {
    booksServiceMock.mockImplementationOnce(() =>
      Promise.resolve({ items: [] })
    );
    const { getByLabelText, getByText } = render(<App />);
    const input = getByLabelText(/Search for a book/i);
    expect(input).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(input.value).toEqual("Harry Potter");

    await act(async () => fireEvent.submit(input));
    expect(booksServiceMock).toHaveBeenCalled();
    getByText("No results found. Please try again!");
  });

  it("Supports loading animations", () => {});
});
