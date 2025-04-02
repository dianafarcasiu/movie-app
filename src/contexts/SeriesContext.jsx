import { createContext, useContext, useReducer } from "react";

const SeriesContext = createContext();

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pCl9L7MBmNmGqcOzOxpUpqCcg2kySLoYc-FkygpmaMA",
  },
};
const SERIES_URL = {
  topRated: "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
  popular: "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
  discover:
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=vote_count.desc",
  genre:
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&sort_by=vote_count.desc&with_genres=",
  details: "https://api.themoviedb.org/3/tv/",
  search: "https://api.themoviedb.org/3/search/tv?query=",
};

const initialState = {
  topRatedSeries: [],
  popularSeries: [],
  discoverSeries: [],
  similarSeries: [],
  searchedSeries: [],
  seriesLoading: true,

  currentSeries: {},
  currentSeriesCast: [],
  currentSeriesTrailers: [],
  currentSeriesLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "setTopRatedSeries":
      return { ...state, topRatedSeries: action.payload };
    case "setPopularSeries":
      return { ...state, popularSeries: action.payload };
    case "setDiscoverSeries":
      return { ...state, discoverSeries: action.payload, seriesLoading: false };
    case "setSimilarSeries":
      return { ...state, similarSeries: action.payload };
    case "setSearchedSeries":
      return { ...state, searchedSeries: action.payload, seriesLoading: false };

    case "setCurrentSeries":
      return {
        ...state,
        currentSeries: action.payload,
        currentSeriesLoading: false,
      };
    case "setSeriesCast":
      return { ...state, currentSeriesCast: action.payload };
    case "setSeriesTrailers":
      return { ...state, currentSeriesTrailers: action.payload };

    case "loadingSeries":
      return { ...state, seriesLoading: true };
    case "loadingCurrentSeries":
      return { ...state, currentSeriesLoading: true };

    case "clearSeries":
      return { ...state, discoverSeries: [] };
    case "clearCurrentSeries":
      return { ...state, currentSeries: {} };
    default:
      throw new Error("Unknown action type.");
  }
}

function SeriesProvider({ children }) {
  const [
    {
      topRatedSeries,
      popularSeries,
      discoverSeries,
      similarSeries,
      searchedSeries,
      seriesLoading,
      currentSeries,
      currentSeriesCast,
      currentSeriesTrailers,
      currentSeriesLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function fetchSeries(url, type, numResults = 10, prevResults = []) {
    try {
      const res = await fetch(url, OPTIONS);
      if (!res.ok) throw new Error("Failed to fetch series data.");
      const data = await res.json();
      dispatch({
        type: type,
        // Show more functionality
        payload: [...prevResults, ...data.results?.slice(0, numResults)],
      });
    } catch (error) {
      console.error(error);
    }
  }
  async function getTopRatedSeries() {
    fetchSeries(SERIES_URL.topRated, "setTopRatedSeries");
  }
  async function getPopularSeries() {
    fetchSeries(SERIES_URL.popular, "setPopularSeries");
  }
  async function getDiscoverSeries(page) {
    if (page === undefined) return;
    const url = `${SERIES_URL.discover}&page=${page}`;
    fetchSeries(url, "setDiscoverSeries", 20, discoverSeries);
  }
  async function getSeriesByGenre(genreId, page) {
    dispatch({ type: "loadingSeries" });
    const url = `${SERIES_URL.genre}${genreId}&page=${page}`;
    fetchSeries(url, "setDiscoverSeries", 20, discoverSeries);
  }
  async function getSimilarSeries(seriesId) {
    const url = `${SERIES_URL.details}${seriesId}/similar?language=en-US`;
    fetchSeries(url, "setSimilarSeries", 5);
  }
  async function getSearchedSeries(query) {
    dispatch({ type: "loadingSeries" });
    const url = `${SERIES_URL.search}${query}&include_adult=false&language=en-US`;
    fetchSeries(url, "setSearchedSeries");
  }
  function clearSeries() {
    dispatch({ type: "clearSeries" });
  }

  async function fetchSeriesDetails(url, type) {
    try {
      const res = await fetch(url, OPTIONS);
      if (!res.ok) throw new Error("Failed to fetch series data.");
      const data = await res.json();

      let payload;
      if (type === "setCurrentSeries") payload = data;
      else if (type === "setSeriesCast") payload = data.cast.slice(0, 5) || [];
      else if (type === "setSeriesTrailers")
        payload =
          data.results.filter((video) => video.type === "Trailer") || [];

      dispatch({ type, payload });
    } catch (error) {
      console.error(error);
    }
  }
  function getCurrentSeries(seriesId) {
    dispatch({ type: "clearCurrentSeries" });
    dispatch({ type: "loadingCurrentSeries" });
    const url = `${SERIES_URL.details}${seriesId}?language=en-US`;
    fetchSeriesDetails(url, "setCurrentSeries");
  }
  function getSeriesCast(seriesId) {
    const url = `${SERIES_URL.details}${seriesId}/credits?language=en-US`;
    fetchSeriesDetails(url, "setSeriesCast");
  }
  function getSeriesTrailers(seriesId) {
    const url = `${SERIES_URL.details}${seriesId}/videos?language=en-US`;
    fetchSeriesDetails(url, "setSeriesTrailers");
  }

  return (
    <SeriesContext.Provider
      value={{
        topRatedSeries,
        getTopRatedSeries,
        popularSeries,
        getPopularSeries,
        discoverSeries,
        getDiscoverSeries,
        getSeriesByGenre,
        clearSeries,
        seriesLoading,
        currentSeries,
        getCurrentSeries,
        similarSeries,
        getSimilarSeries,
        currentSeriesCast,
        getSeriesCast,
        currentSeriesTrailers,
        getSeriesTrailers,
        currentSeriesLoading,
        searchedSeries,
        getSearchedSeries,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
}

function useSeries() {
  const context = useContext(SeriesContext);
  if (context === undefined)
    throw new Error("Function used outside the provider.");
  return context;
}

export { SeriesProvider, useSeries };
