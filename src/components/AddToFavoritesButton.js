import { useEffect, useState } from "react";

export default function AddToFavoritesButton({ type, result }) {
  const resultsFromLS = JSON.parse(localStorage.getItem("resultsForLS")) || [];
  const [resultsForLS, setResultsForLS] = useState(resultsFromLS);
  const [isAddedToFavorites, setIsAddedToFavorites] = useState(() => {
    return resultsFromLS.some((item) => item.id === result.id);
  });

  useEffect(
    function () {
      localStorage.setItem("resultsForLS", JSON.stringify(resultsForLS));
    },
    [resultsForLS]
  );

  useEffect(() => {
    setIsAddedToFavorites(resultsFromLS.some((item) => item.id === result.id));
  }, [result.id]);

  function handleAddToFavorites() {
    try {
      const isResultInFavorites = resultsFromLS.some(
        (item) => item.id === result.id
      );

      if (!isResultInFavorites) {
        const favorites = [
          ...resultsFromLS,
          {
            poster_path: result?.poster_path,
            id: result?.id,
            type: type,
          },
        ];

        localStorage.setItem("resultsForLS", JSON.stringify(favorites));
        setResultsForLS(favorites);
        setIsAddedToFavorites((is) => !is);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return isAddedToFavorites ? (
    <button className="fav-btn" onClick={handleAddToFavorites} disabled>
      <i className="fa-solid fa-check"></i>
      <span>Added to watchlist</span>
    </button>
  ) : (
    <button className="fav-btn" onClick={handleAddToFavorites}>
      <i className="fa-solid fa-plus"></i>
      <span>Add to watchlist</span>
    </button>
  );
}
