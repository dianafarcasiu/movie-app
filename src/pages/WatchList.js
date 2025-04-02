import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useFavorites } from "../contexts/FavoritesContext";
import WatchListCard from "../components/WatchListCard";
import Heading from "../components/Heading";

export default function WatchList() {
  const { favorites, deleteFavorite } = useFavorites();
  const { lightModeOn } = useTheme();

  return (
    <>
      <div className="container fluid">
        <Heading>Watchlist</Heading>
      </div>
      {favorites.length === 0 ? (
        <div className="container fluid text-center">
          <h6 className={`${lightModeOn ? "text-dark" : ""}`}>
            Your watchlist is currently empty, start adding some titles to your
            list!
          </h6>
        </div>
      ) : (
        <div className="container fluid results d-flex flex-wrap gap-4 justify-content-center">
          {favorites.map((favorite) => (
            <div className="watchlist-item" key={favorite.id}>
              <Link to={`/${favorite.type}/${favorite.id}`}>
                <WatchListCard result={favorite} />
              </Link>
              <button
                className="fav-delete-btn"
                onClick={() => deleteFavorite(favorite)}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
