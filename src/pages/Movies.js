import Navbar from "../containers/Navbar";
import Genres from "../containers/Genres";
import Heading from "../components/Heading";
import MovieResults from "../containers/MovieResults";
import { useState } from "react";
import Footer from "../containers/Footer";

export default function Movies() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
    },
  };
  const discoverMoviesURL =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc";

  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("Discover Movies");
  const [url, setUrl] = useState(discoverMoviesURL);

  function handleGenreClick(genre) {
    const genreUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genre.id}`;
    setUrl(genreUrl);
    setTitle(`Discover ${genre.name} Movies`);
  }

  return (
    <>
      <Navbar />
      <div className="container fluid">
        <Genres onGenreClick={handleGenreClick} />
        <Heading>{title}</Heading>
        <MovieResults
          url={url}
          options={options}
          results={movies}
          setResults={setMovies}
          numOfResults={20}
        />
      </div>
      <Footer />
    </>
  );
}
