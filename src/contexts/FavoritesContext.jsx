import { createContext, useContext, useReducer } from "react";

const FavoritesContext = createContext();

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "toggleFavorite":
      const { title, type } = action.payload;
      const isTitleInFavorites = state.favorites.some(
        (fav) => fav.id === title.id
      );
      const updatedFavorites = isTitleInFavorites
        ? state.favorites.filter((fav) => fav.id !== title.id)
        : [
            ...state.favorites,
            {
              poster_path: title?.poster_path,
              id: title?.id,
              type: type,
            },
          ];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return { ...state, favorites: updatedFavorites };

    case "deleteFavorite":
      const filteredFavorites = state.favorites.filter(
        (fav) => fav.id !== action.payload.id
      );
      localStorage.setItem("favorites", JSON.stringify(filteredFavorites));
      return { ...state, favorites: filteredFavorites };
    default:
      throw new Error("Unknown action type.");
  }
}

function FavoritesProvider({ children }) {
  const [{ favorites }, dispatch] = useReducer(reducer, initialState);

  function toggleFavorite(title, type) {
    dispatch({ type: "toggleFavorite", payload: { title, type } });
  }
  function deleteFavorite(title) {
    dispatch({ type: "deleteFavorite", payload: title });
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined)
    throw new Error("Function used outside the provider");
  return context;
}

export { FavoritesProvider, useFavorites };
