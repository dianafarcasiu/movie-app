import { useState } from "react";

export default function GenreCard({ genre, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="genre-card d-flex align-items-center justify-content-center"
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
