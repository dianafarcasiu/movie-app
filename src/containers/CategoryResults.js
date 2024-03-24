import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

export default function CategoryResults({ url, options }) {
  const [results, setResults] = useState([]);

  useEffect(
    function () {
      async function getTopRated() {
        const res = await fetch(url, options);
        const data = await res.json();
        setResults(data.results.slice(0, 15));
      }
      getTopRated();
    },
    [url, options]
  );

  return (
    <div className="d-flex flex-wrap gap-4 justify-content-center">
      {results.map((movie) => (
        <MovieCard movie={movie} id={movie.id} key={movie.id} />
      ))}
    </div>
  );
}
