import { useEffect, useState } from "react";
import { useSeries } from "../contexts/SeriesContext";
import Genres from "../containers/Genres";
import Heading from "../components/Heading";
import Results from "../containers/Results";
import Footer from "../containers/Footer";
import ShowMoreBtn from "../components/ShowMoreBtn";
import Spinner from "../components/Spinner";

export default function Series() {
  const {
    discoverSeries,
    getDiscoverSeries,
    getSeriesByGenre,
    clearSeries,
    seriesLoading,
  } = useSeries();

  const [title, setTitle] = useState("Discover Series");
  const [page, setPage] = useState(1);
  const [genreId, setGenreId] = useState(null);

  useEffect(() => {
    if (genreId === null) getDiscoverSeries(page);
    else getSeriesByGenre(genreId, page);
  }, [genreId, page]);

  function handleGenreClick(genre) {
    let genreId = genre.name === "Action" ? 10759 : genre.id;
    setGenreId(genreId);
    setTitle(`Discover ${genre.name} Series`);
    setPage(1);
    clearSeries();
  }

  return (
    <>
      <div className="container fluid">
        <Genres onGenreClick={handleGenreClick} />
        <Heading>{title}</Heading>

        {seriesLoading ? (
          <Spinner />
        ) : (
          <>
            <Results
              type="tv"
              results={discoverSeries}
              fetchAction={() => getDiscoverSeries()}
            />
            <ShowMoreBtn setPage={setPage} />
          </>
        )}
      </div>

      <Footer />
    </>
  );
}
