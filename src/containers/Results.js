import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../App";

import ResultCard from "../components/ResultCard";

export default function Results({
  url,
  options,
  type,
  setHasSimilarTitles,
  page,
  setPage,
  query,
  numOfResults = 20,
  showMore = false,
}) {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const { lightModeOn } = useContext(DarkModeContext);

  useEffect(
    function () {
      async function getMovies() {
        try {
          const res = await fetch(`${url}&page=${page}`, options);
          if (!res.ok) throw new Error("Failed to fetch movie data.");

          const data = await res.json();
          const slicedResults = data.results.slice(0, numOfResults);

          if (!page || page === 1) setResults(slicedResults);
          else setResults((prevResults) => [...prevResults, ...slicedResults]);

          setHasSimilarTitles(slicedResults.length > 0);
        } catch (error) {
          console.error(error);
        }
      }
      if (query?.length > 0) setSearched(true);
      else setSearched(false);

      getMovies();
    },
    [url, options, setHasSimilarTitles, numOfResults, page, showMore, query]
  );

  function handleShowMoreClick() {
    setPage((page) => page + 1);
  }

  return (
    <>
      <div className="results d-flex flex-wrap gap-4 justify-content-center">
        {results
          .filter(
            (result, index, self) =>
              self.findIndex((r) => r.id === result.id) === index
          )
          .map((result) => (
            <Link to={`/${type}/${result.id}`} key={result.id}>
              <ResultCard
                result={result}
                type={type}
                id={result.id}
                key={result.id}
              />
            </Link>
          ))}
      </div>
      {searched && results.length === 0 && (
        <p className={`text-center mb-5 ${lightModeOn ? "text-dark" : ""}`}>
          Sorry, no titles found.
        </p>
      )}
      {showMore && page < 50 && (
        <div className="d-flex justify-content-center align-items-center my-5">
          <button
            className={`show-more-btn ${lightModeOn ? "light" : ""}`}
            onClick={handleShowMoreClick}
          >
            Show more...
          </button>
        </div>
      )}
    </>
  );
}

// Not working quite as expected, leaving it out at the moment

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";

// {/* {style === "slider" && (
//   <Swiper
//     modules={[Navigation]}
//     navigation={true}
//     loop={true}
//     className="results-swiper"
//     breakpoints={{320: {slidesPerView: 2}, 480: {slidesPerView: 2}, ..........}
//   >
//     {results.map((result) => (
//       <SwiperSlide>
//         <Link to={`/${type}/${result.id}`} key={result.id}>
//           <ResultCard result={result}></ResultCard>
//         </Link>
//       </SwiperSlide>
//     ))}
//   </Swiper>
// )} */}
