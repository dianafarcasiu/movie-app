import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Navbar from "../containers/Navbar";
import Heading from "../components/Heading";
import MovieResults from "../containers/MovieResults";
import SeriesResults from "../containers/SeriesResults";

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
  const searchMoviesUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const searchSeriesUrl = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <Navbar />
      <div className="container fluid">
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          query={query}
          setQuery={setQuery}
        />

        {query && <Heading>Movie results for "{query}"</Heading>}
        <MovieResults url={searchMoviesUrl} options={options} />

        {query && <Heading>Series results for "{query}"</Heading>}
        <SeriesResults url={searchSeriesUrl} options={options} />
      </div>
    </>
  );
}
