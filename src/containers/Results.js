import { useEffect, useState } from "react";
import ResultCard from "../components/ResultCard";
import { Link } from "react-router-dom";

export default function Results({
  url,
  options,
  type,
  setHasSimilarTitles,
  numOfResults = 20,
}) {
  const [results, setResults] = useState([]);

  useEffect(
    function () {
      async function getMovies() {
        try {
          const res = await fetch(url, options);
          if (!res.ok) throw new Error("Failed to fetch movie data.");

          const data = await res.json();
          setResults(data.results.slice(0, numOfResults));
          setHasSimilarTitles(data.results.slice(0, numOfResults).length > 0);
        } catch (error) {
          console.error(error);
        }
      }
      getMovies();
    },
    [url, options, setHasSimilarTitles, numOfResults]
  );

  return (
    <div className="results d-flex flex-wrap gap-4 justify-content-center">
      {results.map((result) => (
        <Link to={`/${type}/${result.id}`} key={result.id}>
          <ResultCard
            result={result}
            type={type}
            id={result.id}
            key={result.id}
          />
        </Link>
      ))}
    </div>
  );
}
