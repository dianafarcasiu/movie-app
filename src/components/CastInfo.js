import React, { useEffect } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";

export default function CastInfo({ id, type }) {
  const { currentMovieCast, getMovieCast } = useMovies();
  const { currentSeriesCast, getSeriesCast } = useSeries();

  useEffect(() => {
    if (type === "movie") getMovieCast(id);
    else if (type === "tv") getSeriesCast(id);
  }, [type, id, getMovieCast, getSeriesCast]);

  const cast = type === "movie" ? currentMovieCast : currentSeriesCast;

  return (
    <p
      className="cast-info"
      style={{ display: cast?.length < 1 ? "none" : "block" }}
    >
      Cast:{" "}
      {cast?.map((actor, idx) => (
        <React.Fragment key={actor.id}>
          <span>{actor.name}</span>
          {idx !== cast?.length - 1 && <span>, </span>}
        </React.Fragment>
      ))}
    </p>
  );
}
