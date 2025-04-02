import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useMovies } from "../contexts/MoviesContext";
import Heading from "../components/Heading";
import TrailerButton from "../components/TrailerButton";
import Footer from "../containers/Footer";
import Results from "../containers/Results";
import CastInfo from "../components/CastInfo";
import ToggleFavoritesButton from "../components/ToggleFavoritesButton";
import Spinner from "../components/Spinner";

export default function MovieDetails() {
  const { movieId } = useParams();
  const {
    currentMovie,
    getMovieDetails,
    similarMovies,
    getSimilarMovies,
    currentMovieLoading,
  } = useMovies();

  useEffect(() => {
    if (movieId) {
      getMovieDetails(movieId);
      getSimilarMovies(movieId);
    }
  }, [movieId]);

  useEffect(
    function () {
      document.title = `PopcornTime | ${currentMovie.title}`;
      return function () {
        document.title = "PopcornTime";
      };
    },
    [currentMovie]
  );

  if (currentMovieLoading) return <Spinner />;

  return (
    <>
      <div
        className="details-container d-flex flex-column justify-content-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${currentMovie?.backdrop_path}) top/cover no-repeat`,
        }}
      >
        <div className="movie-details container fluid">
          <h1>{currentMovie.title}</h1>
          <div className="info d-flex flex-wrap gap-2">
            <small>&bull; {currentMovie.release_date?.split("-")[0]}</small>
            {currentMovie.runtime !== 0 && (
              <small>&bull; {currentMovie.runtime} min</small>
            )}
            <small>
              &bull;{" "}
              {currentMovie.genres &&
                currentMovie.genres?.map((genre, idx) => (
                  <span key={idx}>
                    <span>{genre.name}</span>
                    {idx !== currentMovie.genres.length - 1 && <span>, </span>}
                  </span>
                ))}
            </small>
            {currentMovie.vote_average > 0 && (
              <small>
                &bull;{" "}
                <span
                  style={{
                    color:
                      currentMovie.vote_average >= 8
                        ? "#32CD32"
                        : currentMovie.vote_average >= 6
                        ? "#FF9529"
                        : "#FF4433",
                  }}
                >
                  {currentMovie.vote_average?.toFixed(1)}
                </span>{" "}
                <i
                  className="fa-solid fa-star"
                  style={{
                    color: "#FDCC0D",
                    fontSize: "0.8rem",
                  }}
                ></i>
              </small>
            )}
          </div>

          <h5>{currentMovie.tagline}</h5>
          <p className="overview">{currentMovie.overview}</p>

          <div className="info-btns d-flex gap-4">
            <TrailerButton id={movieId} type="movie" />

            <ToggleFavoritesButton title={currentMovie} type="movie" />
          </div>
          <CastInfo id={movieId} type="movie" />
        </div>
      </div>

      {similarMovies.length > 0 && (
        <>
          <div className="container fluid">
            <Heading>Similar titles</Heading>
          </div>

          <Results results={similarMovies} type="movie" />
        </>
      )}

      <Footer />
    </>
  );
}
