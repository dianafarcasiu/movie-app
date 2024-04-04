import Navbar from "../containers/Navbar";
import Genres from "../containers/Genres";
import Heading from "../components/Heading";
import { useState } from "react";
import Results from "../containers/Results";
import Footer from "../containers/Footer";

export default function Series() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
    },
  };
  const discoverSeriesURL =
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc";

  const [series, setSeries] = useState([]);
  const [title, setTitle] = useState("Discover Series");
  const [url, setUrl] = useState(discoverSeriesURL);

  function handleGenreClick(genre) {
    let genreId = genre.name === "Action" ? 10759 : genre.id;
    const genreUrl = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=vote_count.desc&with_genres=${genreId}`;
    setUrl(genreUrl);
    setTitle(`Discover ${genre.name} Series`);
  }

  return (
    <>
      <Navbar />
      <div className="container fluid">
        <Genres onGenreClick={handleGenreClick} />
        <Heading>{title}</Heading>
        <Results
          url={url}
          options={options}
          type="tv"
          results={series}
          setResults={setSeries}
          numOfResults={20}
        />
      </div>
      <Footer />
    </>
  );
}
