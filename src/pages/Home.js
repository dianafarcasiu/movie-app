import Navbar from "../containers/Navbar";
import Slider from "../containers/Slider";
import Heading from "../components/Heading";
import CategoryResults from "../containers/CategoryResults";
import Footer from "../containers/Footer";

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
  const topRatedShowsURL =
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1";
  const popularMoviesURL =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const popularShowsURL =
    "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1";

  return (
    <>
      <Navbar />
      {/* <Heading>Now in Cinemas</Heading> */}
      <Slider url={sliderMoviesURL} options={options} />
      <div className="container fluid">
        <Heading>Top Rated Movies</Heading>
        <CategoryResults url={topRatedMoviesURL} options={options} />

        <Heading>Top Rated Shows</Heading>
        <CategoryResults url={topRatedShowsURL} options={options} />

        <Heading>Popular Movies</Heading>
        <CategoryResults url={popularMoviesURL} options={options} />

        <Heading>Popular Shows</Heading>
        <CategoryResults url={popularShowsURL} options={options} />
      </div>
      <Footer />
    </>
  );
}
