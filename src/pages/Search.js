import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import { useTheme } from "../contexts/ThemeContext";
import SearchBar from "../components/SearchBar";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import Spinner from "../components/Spinner";

export default function Search() {
  const { searchedMovies, getSearchedMovies, moviesLoading } = useMovies();
  const { searchedSeries, getSearchedSeries, seriesLoading } = useSeries();
  const { lightModeOn } = useTheme();

  const [query, setQuery] = useState("");
  const isLoading = moviesLoading || seriesLoading;

  useEffect(() => {
    getSearchedMovies(query);
    getSearchedSeries(query);
  }, [query]);

  function handleQueryChange(e) {
    setQuery(e.target.value);
  }

  return (
    <>
      <div className="container fluid min-vh-100">
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          query={query}
          setQuery={setQuery}
        />

        {query && isLoading && <Spinner />}

        {query && !isLoading && (
          <>
            <Heading>Movie results for "{query}"</Heading>

            {searchedMovies.length > 0 ? (
              <Results results={searchedMovies} type="movie" />
            ) : (
              <p
                className={`text-center mb-5 ${lightModeOn ? "text-dark" : ""}`}
              >
                Sorry, no movie titles found.
              </p>
            )}

            <Heading>Series results for "{query}"</Heading>

            {searchedSeries.length > 0 ? (
              <Results results={searchedSeries} type="tv" />
            ) : (
              <p
                className={`text-center mb-5 ${lightModeOn ? "text-dark" : ""}`}
              >
                Sorry, no series titles found.
              </p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
