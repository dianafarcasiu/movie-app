import { useState } from "react";

export default function TrailerButton({ type, ID, options }) {
  const [trailerAvailable, setTrailerAvailable] = useState(true);

  async function handleTrailerClick() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${ID}/videos?language=en-US`,
        options
      );
      if (!res.ok) throw new Error("Failed to fetch trailer data");

      const data = await res.json();
      const trailers = data.results.filter((video) => video.type === "Trailer");
      const trailerUrl =
        trailers.length > 0
          ? `https://www.youtube.com/watch?v=${trailers[0].key}`
          : null;

      if (trailerUrl) window.open(trailerUrl, "_blank");
      else {
        console.error("No trailer found for this movie");
        setTrailerAvailable(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return trailerAvailable ? (
    <button className="trailer-btn" onClick={handleTrailerClick}>
      <i className="fa-brands fa-youtube"></i> <span>Watch trailer</span>
    </button>
  ) : (
    <button className="trailer-btn" disabled>
      <span>No trailer available</span>
    </button>
  );
}
