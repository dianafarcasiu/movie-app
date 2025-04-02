import { useEffect } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";

export default function TrailerButton({ id, type }) {
  const { currentMovieTrailers, getMovieTrailers } = useMovies();
  const { currentSeriesTrailers, getSeriesTrailers } = useSeries();

  useEffect(() => {
    if (type === "movie") getMovieTrailers(id);
    else if (type === "tv") getSeriesTrailers(id);
  }, [type, id]);

  const trailers =
    type === "movie" ? currentMovieTrailers : currentSeriesTrailers;

  function handleTrailerClick() {
    const trailerUrl =
      trailers.length > 0
        ? `https://www.youtube.com/watch?v=${trailers[0].key}`
        : null;

    if (trailerUrl) window.open(trailerUrl, "_blank");
  }

  return (
    <button
      className="trailer-btn"
      onClick={handleTrailerClick}
      disabled={!trailers || trailers.length === 0}
    >
      <i className="fa-brands fa-youtube"></i>{" "}
      <span>
        {trailers.length > 0 ? "Watch trailer" : "No trailer available"}
      </span>
    </button>
  );
}
