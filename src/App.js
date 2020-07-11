import React, { useReducer } from "react";
import services from "./services";
import SearchInput from "./components/SearchInput";
import Results from "./components/Results";

const IDLE_STATE = "IDLE";
const LOADING_STATE = "LOADING";
const EMPTY_STATE = "EMPTY";
const ERROR_STATE = "ERROR";
const SUCCESS_STATE = "SUCCESS";

function reducer(state, action) {
  switch (action.type) {
    case ERROR_STATE:
      return { results: [], message: ERROR_STATE };
    case SUCCESS_STATE:
      return { results: action.results, message: SUCCESS_STATE };
    case EMPTY_STATE:
      return { results: [], message: EMPTY_STATE };
    case IDLE_STATE:
      return { results: [], message: IDLE_STATE };
    case LOADING_STATE:
        return { results: [], message: LOADING_STATE };
    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    results: [],
    message: IDLE_STATE,
  });

  function handleSubmit(query) {
    return services.callBooksService(query).then((data) => {
      if (data.error) {
        dispatch({ type: ERROR_STATE });
        return;
      }
      if (data.items.length > 0) {
        dispatch({ type: SUCCESS_STATE, results: data.items });
      }

      if (data.items.length === 0) {
        dispatch({ type: EMPTY_STATE });
      }
    });
  }
  return (
    <main className="container px-5 py-24 mx-auto">
      <section data-test-id="search">
        <SearchInput onSubmit={handleSubmit} />
      </section>

      <section
        data-test-id="results"
        className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4"
      >
        {state.message === SUCCESS_STATE ? (
          <Results results={state.results} />
        ) : null}
        {state.message === EMPTY_STATE ? (
          <p>No results found. Please try again!</p>
        ) : null}
      </section>
    </main>
  );
}

export default App;
