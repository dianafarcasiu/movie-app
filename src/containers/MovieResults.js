import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function MovieResults({ url, options, numOfResults = 20 }) {
  const [results, setResults] = useState([]);

  useEffect(
    function () {
      async function getMovies() {
        const res = await fetch(url, options);
        const data = await res.json();
        setResults(data.results.slice(0, numOfResults));
      }
      getMovies();
    },
    [url, options, numOfResults]
  );

  return (
    <div className="results d-flex flex-wrap gap-4 justify-content-center">
      {results.map((movie) => (
        <MovieCard movie={movie} id={movie.id} key={movie.id} />
      ))}
    </div>
  );
}
