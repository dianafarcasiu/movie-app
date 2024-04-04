import { useParams } from "react-router-dom";
import Navbar from "../containers/Navbar";
import { useEffect, useState } from "react";
import TrailerButton from "../components/TrailerButton";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import CastInfo from "../components/CastInfo";
import AddToFavoritesButton from "../components/AddToFavoritesButton";

export default function SeriesDetails() {
  const { seriesID } = useParams();
  const [series, setSeries] = useState([]);
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
      async function getSeriesDetails() {
        const res = await fetch(
          `https://api.themoviedb.org/3/tv/${seriesID}?language=en-US`,
          options
        );
        const data = await res.json();
        setSeries(data);
        setGenres(data.genres);
      }
      getSeriesDetails();
    },
    [seriesID]
  );

  return (
    <>
      <Navbar />
      <div
        className="details-container d-flex flex-column justify-content-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/original/${series.backdrop_path}) top/cover no-repeat`,
        }}
      >
        <div className="series-details container fluid">
          <h1>{series.name}</h1>
          <div className="info d-flex flex-wrap gap-2">
            <small>&bull; {series.first_air_date?.split("-")[0]}</small>
            <small>&bull; {series.number_of_seasons} Seasons</small>
            <small>&bull; {series.number_of_episodes} Episodes</small>
            {series.episode_run_time?.length !== 0 && (
              <small>&bull; {series.episode_run_time} min</small>
            )}
            <small>
              &bull;{" "}
              {genres.map((genre, idx) => (
                <>
                  <span key={idx}>{genre.name}</span>
                  {idx !== series.genres.length - 1 && <span>, </span>}
                </>
              ))}
            </small>
          </div>

          <h5>{series.tagline}</h5>
          <p className="overview">{series.overview}</p>

          <div className="series-btns d-flex gap-4">
            <TrailerButton type="tv" ID={seriesID} options={options} />
            <AddToFavoritesButton type="tv" result={series} />
          </div>
          <CastInfo type="tv" ID={seriesID} options={options} />
        </div>
      </div>

      {hasSimilarTitles && (
        <div className="container fluid">
          <Heading>Similar titles</Heading>
        </div>
      )}

      <Results
        url={`https://api.themoviedb.org/3/tv/${seriesID}/similar?language=en-US&page=1`}
        options={options}
        type="tv"
        numOfResults={5}
        setHasSimilarTitles={setHasSimilarTitles}
      />

      <Footer />
    </>
  );
}
