import { useTheme } from "../contexts/ThemeContext";

export default function WatchListCard({ result, type }) {
  const { lightModeOn } = useTheme();

  return result.poster_path ? (
    <div
      className={`watchlist-card ${
        lightModeOn ? "light" : ""
      } d-flex justify-content-center align-items-end`}
      style={{
        background: `url(https://image.tmdb.org/t/p/w500/${result?.poster_path}) center/cover no-repeat`,
      }}
    ></div>
  ) : (
    <div className="watchlist-card simple">
      <h5>{type === "movie" ? result.title : result.name}</h5>
    </div>
  );
}
