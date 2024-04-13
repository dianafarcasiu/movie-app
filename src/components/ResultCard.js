import { useContext } from "react";
import { DarkModeContext } from "../App";

export default function ResultCard({ result, type }) {
  const { lightModeOn } = useContext(DarkModeContext);

  return result.poster_path ? (
    <div
      className={`result-card ${lightModeOn ? "light" : ""}`}
      style={{
        background: `url(https://image.tmdb.org/t/p/w500/${result?.poster_path}) center/cover no-repeat`,
      }}
    ></div>
  ) : (
    <div className={`result-card simple ${lightModeOn ? "light" : ""}`}>
      <h5>{type === "movie" ? result.title : result.name}</h5>
    </div>
  );
}
