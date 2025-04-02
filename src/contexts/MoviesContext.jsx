import { createContext, useContext, useReducer } from "react";

const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOGNlYmIzNjMwZWZiNzYyMWIyODExZTMxNGM0NDdkZSIsIm5iZiI6MTcwODM0ODA2OC4zMTksInN1YiI6IjY1ZDM1MmE0MjhkN2ZlMDE3YzM1YTliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nwdfcXwKi9rphvoAVd6zCRTwbE4lAj3ofxB67D_cNrw",
  },
};
const MOVIE_URLS = {
  slider:
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  topRated:
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  popular: "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  discover:
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_count.desc",
  genre:
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_count.desc&with_genres=",
  details: "https://api.themoviedb.org/3/movie/",
  search: "https://api.themoviedb.org/3/search/movie?query=",
};

const initialState = {
  sliderMovies: [],
  topRatedMovies: [],
  popularMovies: [],
  discoverMovies: [],
  similarMovies: [],
  searchedMovies: [],
  moviesLoading: true,

  currentMovie: {},
  currentMovieCast: [],
  currentMovieTrailers: [],
  currentMovieLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "setSliderMovies":
      return { ...state, sliderMovies: action.payload };
    case "setTopRatedMovies":
      return { ...state, topRatedMovies: action.payload };
    case "setPopularMovies":
      return { ...state, popularMovies: action.payload };
    case "setDiscoverMovies":
      return { ...state, discoverMovies: action.payload, moviesLoading: false };
    case "setSimilarMovies":
      return { ...state, similarMovies: action.payload };
    case "setSearchedMovies":
      return { ...state, searchedMovies: action.payload, moviesLoading: false };

    case "setCurrentMovie":
      return {
        ...state,
        currentMovie: action.payload,
        currentMovieLoading: false,
      };
    case "setMovieCast":
      return { ...state, currentMovieCast: action.payload };
    case "setMovieTrailers":
      return { ...state, currentMovieTrailers: action.payload };

    case "loadingMovies":
      return { ...state, moviesLoading: true };
    case "loadingCurrentMovie":
      return { ...state, currentMovieLoading: true };

    case "clearMovies":
      return { ...state, discoverMovies: [] };
    case "clearCurrentMovie":
      return { ...state, currentMovie: {} };
    default:
      throw new Error("Unknown action type");
  }
}

const MoviesContext = createContext();

function MoviesProvider({ children }) {
  const [
    {
      sliderMovies,
      topRatedMovies,
      popularMovies,
      discoverMovies,
      similarMovies,
      searchedMovies,
      moviesLoading,

      currentMovie,
      currentMovieCast,
      currentMovieTrailers,
      currentMovieLoading,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  async function fetchMovies(url, type, numResults = 10, prevResults = []) {
    try {
      const res = await fetch(url, OPTIONS);
      if (!res.ok) throw new Error("Failed to fetch movie data.");
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

  async function getSliderMovies() {
    fetchMovies(MOVIE_URLS.slider, "setSliderMovies");
  }
  async function getTopRatedMovies() {
    fetchMovies(MOVIE_URLS.topRated, "setTopRatedMovies");
  }
  async function getPopularMovies() {
    fetchMovies(MOVIE_URLS.popular, "setPopularMovies");
  }
  async function getDiscoverMovies(page) {
    if (page === undefined) return;
    const url = `${MOVIE_URLS.discover}&page=${page}`;
    await fetchMovies(url, "setDiscoverMovies", 20, discoverMovies);
  }
  async function getMoviesByGenre(genreId, page) {
    dispatch({ type: "loadingMovies" });
    const url = `${MOVIE_URLS.genre}${genreId}&page=${page}`;
    fetchMovies(url, "setDiscoverMovies", 20, discoverMovies);
  }
  async function getSimilarMovies(movieId) {
    const url = `${MOVIE_URLS.details}${movieId}/similar?language=en-US`;
    fetchMovies(url, "setSimilarMovies", 5);
  }
  async function getSearchedMovies(query) {
    dispatch({ type: "loadingMovies" });
    const url = `${MOVIE_URLS.search}${query}&include_adult=false&language=en-US`;
    fetchMovies(url, "setSearchedMovies");
  }
  function clearMovies() {
    dispatch({ type: "clearMovies" });
  }

  async function fetchMovieDetails(url, type) {
    try {
      const res = await fetch(url, OPTIONS);
      if (!res.ok) throw new Error("Failed to fetch movie data.");
      const data = await res.json();

      let payload;
      if (type === "setCurrentMovie") payload = data;
      else if (type === "setMovieCast") payload = data.cast.slice(0, 5) || [];
      else if (type === "setMovieTrailers")
        payload =
          data.results.filter((video) => video.type === "Trailer") || [];

      dispatch({ type, payload });
    } catch (error) {
      console.error(error);
    }
  }

  async function getMovieDetails(movieId) {
    dispatch({ type: "clearCurrentMovie" });
    dispatch({ type: "loadingCurrentMovie" });
    const url = `${MOVIE_URLS.details}${movieId}?language=en-US`;
    await fetchMovieDetails(url, "setCurrentMovie");
  }
  async function getMovieCast(movieId) {
    const url = `${MOVIE_URLS.details}${movieId}/credits?language=en-US`;
    fetchMovieDetails(url, "setMovieCast");
  }
  async function getMovieTrailers(movieId) {
    const url = `${MOVIE_URLS.details}${movieId}/videos?language=en-US`;
    fetchMovieDetails(url, "setMovieTrailers");
  }

  return (
    <MoviesContext.Provider
      value={{
        sliderMovies,
        getSliderMovies,
        topRatedMovies,
        getTopRatedMovies,
        popularMovies,
        getPopularMovies,
        discoverMovies,
        getDiscoverMovies,
        clearMovies,
        getMoviesByGenre,
        currentMovie,
        getMovieDetails,
        currentMovieCast,
        getMovieCast,
        currentMovieTrailers,
        getMovieTrailers,
        similarMovies,
        getSimilarMovies,
        currentMovieLoading,
        moviesLoading,
        searchedMovies,
        getSearchedMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("Function used outside the provider.");
  return context;
}

export { MoviesProvider, useMovies };
