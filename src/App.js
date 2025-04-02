import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MoviesProvider } from "./contexts/MoviesContext";
import { SeriesProvider } from "./contexts/SeriesContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import WatchList from "./pages/WatchList";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetails from "./pages/SeriesDetails";
import Navbar from "./containers/Navbar";

function App() {
  return (
    <ThemeProvider>
      <MoviesProvider>
        <SeriesProvider>
          <FavoritesProvider>
            <BrowserRouter basename="/movie-app">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/search" element={<Search />} />
                <Route path="/watchlist" element={<WatchList />} />
                <Route path="/movie/:movieId" element={<MovieDetails />} />
                <Route path="/tv/:seriesId" element={<SeriesDetails />} />
              </Routes>
            </BrowserRouter>
          </FavoritesProvider>
        </SeriesProvider>
      </MoviesProvider>
    </ThemeProvider>
  );
}

export { App };
