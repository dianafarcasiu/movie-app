import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Search from "./pages/Search";
import WatchList from "./pages/WatchList";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetails from "./pages/SeriesDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/movie/:movieID" element={<MovieDetails />} />
        <Route path="/tv/:seriesID" element={<SeriesDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
