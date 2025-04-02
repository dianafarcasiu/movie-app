import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSeries } from "../contexts/SeriesContext";
import TrailerButton from "../components/TrailerButton";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import CastInfo from "../components/CastInfo";
import ToggleFavoritesButton from "../components/ToggleFavoritesButton";
import Spinner from "../components/Spinner";

export default function SeriesDetails() {
  const { seriesId } = useParams();
  const {
    currentSeries,
    getCurrentSeries,
    similarSeries,
    getSimilarSeries,
    currentSeriesLoading,
  } = useSeries();

  useEffect(() => {
    if (seriesId) getCurrentSeries(seriesId);
    getSimilarSeries(seriesId);
  }, [seriesId]);

  useEffect(() => {
    document.title = currentSeries?.name
      ? `PopcornTime | ${currentSeries.name}`
      : "PopcornTime";

    return function () {
      document.title = "PopcornTime";
    };
  }, [currentSeries]);

  if (currentSeriesLoading) return <Spinner />;

  return (
    <>
      <div
        className="details-container d-flex flex-column justify-content-center"
        style={{
          background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/original/${currentSeries.backdrop_path}) top/cover no-repeat`,
        }}
      >
        <div className="series-details container fluid">
          <h1>{currentSeries.name}</h1>
          <div className="info d-flex flex-wrap gap-2">
            {currentSeries.first_air_date && (
              <small>
                &bull; {currentSeries.first_air_date?.split("-")[0]}
              </small>
            )}
            <small>&bull; {currentSeries.number_of_seasons} Seasons</small>
            <small>&bull; {currentSeries.number_of_episodes} Episodes</small>
            {currentSeries.episode_run_time?.length !== 0 && (
              <small>&bull; {currentSeries.episode_run_time} min</small>
            )}
            <small>
              &bull;{" "}
              {currentSeries.genres?.map((genre, idx) => (
                <span key={idx}>
                  <span>{genre.name}</span>
                  {idx !== currentSeries.genres.length - 1 && <span>, </span>}
                </span>
              ))}
            </small>
            {currentSeries.vote_average > 0 && (
              <small>
                &bull;{" "}
                <span
                  style={{
                    color:
                      currentSeries.vote_average >= 8
                        ? "#32CD32"
                        : currentSeries.vote_average > 5.9
                        ? "#FF9529"
                        : "#FF4433",
                  }}
                >
                  {currentSeries.vote_average?.toFixed(1)}
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

          <h5>{currentSeries.tagline}</h5>
          <p className="overview">{currentSeries.overview}</p>

          <div className="info-btns d-flex gap-4">
            <TrailerButton id={seriesId} type="tv" />
            <ToggleFavoritesButton title={currentSeries} type="tv" />
          </div>
          <CastInfo id={seriesId} type="tv" />
        </div>
      </div>

      {similarSeries.length > 0 && (
        <>
          <div className="container fluid">
            <Heading>Similar titles</Heading>
          </div>
          <Results results={similarSeries} type="tv" />
        </>
      )}

      <Footer />
    </>
  );
}
