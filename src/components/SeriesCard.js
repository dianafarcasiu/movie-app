export default function SeriesCard({ series }) {
  return (
    <div
      className="series-card"
      style={{
        background: `url(https://image.tmdb.org/t/p/w500/${series?.poster_path}) center/cover no-repeat`,
      }}
    ></div>
  );
}
