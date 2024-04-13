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
import { createContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

function App() {
  const [lightModeOn, setLightModeOn] = useState(false);

  function toggleLightMode() {
    setLightModeOn((prevMode) => !prevMode);
  }

  useEffect(
    function () {
      document.body.classList.toggle("light", lightModeOn);
    },
    [lightModeOn]
  );

  return (
    <DarkModeContext.Provider value={{ lightModeOn, toggleLightMode }}>
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
    </DarkModeContext.Provider>
  );
}

export { App, DarkModeContext };
