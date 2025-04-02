import { useTheme } from "../contexts/ThemeContext";

function ShowMoreBtn({ setPage }) {
  const { lightModeOn } = useTheme();

  function handleShowMore() {
    setPage((page) => page + 1);
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <button
        className={`show-more-btn ${lightModeOn ? "light" : ""}`}
        onClick={handleShowMore}
      >
        Show more...
      </button>
    </div>
  );
}

export default ShowMoreBtn;
