import GenreCard from "../components/GenreCard";

const genres = [
  { id: 28, name: "Action", background: require("../imgs/action-bg.jpeg") },
  {
    id: 16,
    name: "Animation",
    background: require("../imgs/animation-bg.png"),
  },
  { id: 35, name: "Comedy", background: require("../imgs/comedy-bg.webp") },
  {
    id: 80,
    name: "Crime",
    background: require("../imgs/thriller-bg.jpeg"),
  },
  {
    id: 99,
    name: "Documentary",
    background: require("../imgs/documentary-bg2.avif"),
  },
  { id: 18, name: "Drama", background: require("../imgs/drama-bg2.webp") },
];

export default function Genres({ onGenreClick }) {
  return (
    <div className="genres-container d-flex flex-wrap gap-4 justify-content-center">
      {genres.map((genre) => (
        <GenreCard
          genre={genre}
          key={genre.id}
          onClick={() => onGenreClick(genre)}
        />
      ))}
    </div>
  );
}
