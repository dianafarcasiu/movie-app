import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Navbar from "../containers/Navbar";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";

export default function Search() {
  const [query, setQuery] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
    },
  };
  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`;
  const searchSeriesUrl = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US`;

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar />
      <div className="container fluid min-vh-100">
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          query={query}
          setQuery={setQuery}
        />

        {query && <Heading>Movie results for "{query}"</Heading>}
        <Results
          url={searchMoviesUrl}
          type="movie"
          options={options}
          query={query}
          page={1}
        />

        {query && <Heading>Series results for "{query}"</Heading>}
        <Results
          url={searchSeriesUrl}
          type="tv"
          options={options}
          query={query}
          page={1}
        />
      </div>
      <Footer />
    </>
  );
}
