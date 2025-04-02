import { useCallback } from "react";
import { useMovies } from "../contexts/MoviesContext";
import { useSeries } from "../contexts/SeriesContext";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import Slider from "../containers/Slider";

export default function Home() {
  const { topRatedMovies, getTopRatedMovies, popularMovies, getPopularMovies } =
    useMovies();
  const { topRatedSeries, getTopRatedSeries, popularSeries, getPopularSeries } =
    useSeries();

  const fetchTopRatedMovies = useCallback(() => getTopRatedMovies(), []);
  const fetchTopRatedSeries = useCallback(() => getTopRatedSeries(), []);
  const fetchPopularMovies = useCallback(() => getPopularMovies(), []);
  const fetchPopularSeries = useCallback(() => getPopularSeries(), []);

  return (
    <>
      <Slider />

      <div className="container fluid">
        <Heading>Top Rated Movies</Heading>
        <Results
          fetchAction={fetchTopRatedMovies}
          results={topRatedMovies}
          type="movie"
        />

        <Heading>Top Rated Series</Heading>
        <Results
          fetchAction={fetchTopRatedSeries}
          results={topRatedSeries}
          type="tv"
        />

        <Heading>Popular Movies</Heading>
        <Results
          fetchAction={fetchPopularMovies}
          results={popularMovies}
          type="movie"
        />

        <Heading>Popular Series</Heading>
        <Results
          fetchAction={fetchPopularSeries}
          results={popularSeries}
          type="tv"
        />
      </div>
      <Footer />
    </>
  );
}
