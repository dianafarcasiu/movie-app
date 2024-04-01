import { useEffect, useState } from "react";
import SeriesCard from "../components/SeriesCard";

export default function SeriesResults({ url, options, numOfResults }) {
  const [results, setResults] = useState([]);

  useEffect(
    function () {
      async function getSeries() {
        const res = await fetch(url, options);
        const data = await res.json();
        setResults(data.results.slice(0, numOfResults));
      }
      getSeries();
    },
    [url, options, numOfResults]
  );

  return (
    <div className="results d-flex flex-wrap gap-4 justify-content-center">
      {results.map((series) => (
        <SeriesCard series={series} id={series.id} key={series.id} />
      ))}
    </div>
  );
}
