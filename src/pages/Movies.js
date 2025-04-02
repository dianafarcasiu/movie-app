import { useEffect, useState } from "react";
import { useMovies } from "../contexts/MoviesContext";
import Genres from "../containers/Genres";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import ShowMoreBtn from "../components/ShowMoreBtn";
import Spinner from "../components/Spinner";

export default function Movies() {
  const {
    discoverMovies,
    getDiscoverMovies,
    getMoviesByGenre,
    clearMovies,
    moviesLoading,
  } = useMovies();

  const [title, setTitle] = useState("Discover Movies");
  const [page, setPage] = useState(1);
  const [genreId, setGenreId] = useState(null);

  useEffect(() => {
    if (genreId === null) getDiscoverMovies(page);
    else getMoviesByGenre(genreId, page);
  }, [genreId, page]);

  function handleGenreClick(genre) {
    clearMovies();
    setGenreId(genre.id);
    setTitle(`Discover ${genre.name} Movies`);
    setPage(1);
  }

  return (
    <>
      <div className="container fluid">
        <Genres onGenreClick={handleGenreClick} />
        <Heading>{title}</Heading>

        {moviesLoading ? (
          <Spinner />
        ) : (
          <>
            <Results
              fetchAction={() => getDiscoverMovies()}
              results={discoverMovies}
              type="movie"
            />
            <ShowMoreBtn setPage={setPage} />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
