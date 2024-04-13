import { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../App";

export default function GenreCard({ genre, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const { lightModeOn } = useContext(DarkModeContext);

  return (
    <div
      className={`genre-card ${
        lightModeOn ? "light" : ""
      } d-flex align-items-center justify-content-center`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        background: isHovered
          ? `url(${genre.background}) center/cover no-repeat`
          : "none",
      }}
    >
      <h4>{genre.name}</h4>
    </div>
  );
}
