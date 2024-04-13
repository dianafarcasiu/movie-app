import Navbar from "../containers/Navbar";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import Slider from "../containers/Slider";

export default function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
    },
  };

  return (
    <>
      <Navbar />
      {/* <Heading>Now in Cinemas</Heading> */}
      <Slider
        url={
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        }
        options={options}
      />
      <div className="container fluid">
        <Heading>Top Rated Movies</Heading>
        <Results
          url={
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
          }
          options={options}
          type="movie"
          numOfResults={10}
          // style="slider"
        />

        <Heading>Top Rated Series</Heading>
        <Results
          url={
            "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
          }
          options={options}
          type="tv"
          numOfResults={10}
        />

        <Heading>Popular Movies</Heading>
        <Results
          url={
            "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
          }
          options={options}
          type="movie"
          numOfResults={10}
        />

        <Heading>Popular Series</Heading>
        <Results
          url={"https://api.themoviedb.org/3/tv/popular?language=en-US&page=1"}
          options={options}
          type="tv"
          numOfResults={10}
        />
      </div>
      <Footer />
    </>
  );
}
