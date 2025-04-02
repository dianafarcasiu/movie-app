import { useEffect } from "react";
import { Link } from "react-router-dom";
import ResultCard from "../components/ResultCard";

export default function Results({ type, fetchAction, results }) {
  useEffect(() => {
    if (fetchAction) fetchAction();
  }, [fetchAction]);

  return (
    <>
      <div className="results d-flex flex-wrap gap-4 justify-content-center">
        {(results ?? [])
          .filter(
            (result, index, self) =>
              self.findIndex((r) => r.id === result.id) === index
          )
          .map((result) => (
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
    </>
  );
}
