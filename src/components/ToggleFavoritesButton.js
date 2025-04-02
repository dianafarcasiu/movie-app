import { useFavorites } from "../contexts/FavoritesContext";

export default function ToggleFavoritesButton({ title, type }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isInFavorites = favorites.some((fav) => fav.id === title.id);

  return isInFavorites ? (
    <button className="fav-btn" onClick={() => toggleFavorite(title, type)}>
      <i className="fa-solid fa-check"></i>
      <span>Added to watchlist</span>
    </button>
  ) : (
    <button className="fav-btn" onClick={() => toggleFavorite(title, type)}>
      <i className="fa-solid fa-plus"></i>
      <span>Add to watchlist</span>
    </button>
  );
}
