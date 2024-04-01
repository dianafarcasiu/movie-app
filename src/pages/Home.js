import Navbar from "../containers/Navbar";
import Slider from "../containers/Slider";
import Heading from "../components/Heading";
import MovieResults from "../containers/MovieResults";
import Footer from "../containers/Footer";
import SeriesResults from "../containers/SeriesResults";

export default function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
    },
  };
  const sliderMoviesURL =
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
  const topRatedMoviesURL =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const topRatedSeriesURL =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  const popularMoviesURL =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const popularSeriesURL =
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";

  return (
    <>
      <Navbar />
      {/* <Heading>Now in Cinemas</Heading> */}
      <Slider url={sliderMoviesURL} options={options} />
      <div className="container fluid">
        <Heading>Top Rated Movies</Heading>
        <MovieResults
          url={topRatedMoviesURL}
          options={options}
          numOfResults={15}
        />

        <Heading>Top Rated Series</Heading>
        <SeriesResults
          url={topRatedSeriesURL}
          options={options}
          numOfResults={15}
        />

        <Heading>Popular Movies</Heading>
        <MovieResults
          url={popularMoviesURL}
          options={options}
          numOfResults={15}
        />

        <Heading>Popular Series</Heading>
        <SeriesResults
          url={popularSeriesURL}
          options={options}
          numOfResults={15}
        />
      </div>
      <Footer />
    </>
  );
}
