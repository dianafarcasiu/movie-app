export default function MovieCard({ movie }) {
  return (
    <div
      className="movie-card"
      style={{
        background: `url(https://image.tmdb.org/t/p/w500/${movie?.poster_path}) center/cover no-repeat`,
      }}
    ></div>
  );
}
