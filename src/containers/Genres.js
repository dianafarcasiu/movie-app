import GenreCard from "../components/GenreCard";

const genres = [
  { id: 28, name: "Action", background: require("../imgs/action-bg2.jpeg") },
  {
    id: 16,
    name: "Animation",
    background: require("../imgs/animation-bg2.jpeg"),
  },
  { id: 35, name: "Comedy", background: require("../imgs/comedy-bg2.webp") },
  {
    id: 80,
    name: "Crime",
    background: require("../imgs/crime-bg2.jpeg"),
  },
  {
    id: 99,
    name: "Documentary",
    background: require("../imgs/documentary-bg.png"),
  },
  { id: 18, name: "Drama", background: require("../imgs/drama-bg.webp") },
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
