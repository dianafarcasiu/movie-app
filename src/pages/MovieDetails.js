import { useParams } from "react-router-dom";
import Navbar from "../containers/Navbar";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import TrailerButton from "../components/TrailerButton";
import Footer from "../containers/Footer";
import Results from "../containers/Results";
import CastInfo from "../components/CastInfo";
import ToggleFavoritesButton from "../components/ToggleFavoritesButton";

export default function MovieDetails() {
  const { movieID } = useParams();
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [hasSimilarTitles, setHasSimilarTitles] = useState(false);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
    },
  };

  useEffect(
    function () {
      async function getMovieDetails() {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
          options
        );
        const data = await res.json();
        setMovie(data);
        setGenres(data.genres);
      }
      getMovieDetails();
    },
    [movieID]
  );

  useEffect(
    function () {
      document.title = `PopcornTime | ${movie.title}`;

      return function () {
        document.title = "PopcornTime";
      };
    },
    [movie]
  );

  return (
    <>
      <Navbar />
      <div
        className="details-container d-flex flex-column justify-content-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path}) top/cover no-repeat`,
        }}
      >
        <div className="movie-details container fluid">
          <h1>{movie.title}</h1>
          <div className="info d-flex flex-wrap gap-2">
            <small>&bull; {movie.release_date?.split("-")[0]}</small>
            {movie.runtime !== 0 && <small>&bull; {movie.runtime} min</small>}
            <small>
              &bull;{" "}
              {genres.map((genre, idx) => (
                <>
                  <span key={idx}>{genre.name}</span>
                  {idx !== movie.genres.length - 1 && <span>, </span>}
                </>
              ))}
            </small>
            {movie.vote_average > 0 && (
              <small>
                &bull;{" "}
                <span
                  style={{
                    color:
                      movie.vote_average >= 8
                        ? "#32CD32"
                        : movie.vote_average >= 6
                        ? "#FF9529"
                        : "#FF4433",
                  }}
                >
                  {movie.vote_average?.toFixed(1)}
                </span>{" "}
                <i
                  class="fa-solid fa-star"
                  style={{
                    color: "#FDCC0D",
                    fontSize: "0.8rem",
                  }}
                ></i>
              </small>
            )}
          </div>

          <h5>{movie.tagline}</h5>
          <p className="overview">{movie.overview}</p>

          <div className="info-btns d-flex gap-4">
            <TrailerButton type="movie" ID={movieID} options={options} />
            <ToggleFavoritesButton type="movie" result={movie} />
          </div>
          <CastInfo type="movie" ID={movieID} options={options} />
        </div>
      </div>

      {hasSimilarTitles && (
        <div className="container fluid">
          <Heading>Similar titles</Heading>
        </div>
      )}

      <Results
        url={`https://api.themoviedb.org/3/movie/${movieID}/similar?language=en-US&page=1`}
        options={options}
        type="movie"
        numOfResults={5}
        setHasSimilarTitles={setHasSimilarTitles}
      />

      <Footer />
    </>
  );
}
