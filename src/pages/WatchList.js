import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../containers/Navbar";
import WatchListCard from "../components/WatchListCard";
import Heading from "../components/Heading";
// import Footer from "../containers/Footer";

export default function WatchList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(function () {
    try {
      const storedResults =
        JSON.parse(localStorage.getItem("resultsForLS")) || [];
      setFavorites(storedResults);
      console.log(storedResults);
    } catch (error) {
      console.error(error);
    }
  }, []);

  function handleDeleteFavorite(id) {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("resultsForLS", JSON.stringify(updatedFavorites));
  }

  return (
    <>
      <Navbar />
      <Heading>Watchlist</Heading>
      <div className="container fluid results d-flex flex-wrap gap-4 justify-content-center">
        {favorites.length === 0 ? (
          <>
            <p>Your watchlist is currently empty.</p>
            <p>Start adding some titles to your list!</p>
          </>
        ) : (
          favorites.map((favorite) => (
            <div className="watchlist-item" key={favorite.id}>
              <Link to={`/${favorite.type}/${favorite.id}`}>
                <WatchListCard result={favorite} />
              </Link>
              <button
                className="fav-delete-btn"
                onClick={() => handleDeleteFavorite(favorite.id)}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}
