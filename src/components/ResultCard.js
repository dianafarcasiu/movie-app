export default function ResultCard({ result, type }) {
  return result.poster_path ? (
    <div
      className="result-card"
      style={{
        background: `url(https://image.tmdb.org/t/p/w500/${result?.poster_path}) center/cover no-repeat`,
      }}
    ></div>
  ) : (
    <div className="result-card simple">
      <h5>{type === "movie" ? result.title : result.name}</h5>
    </div>
  );
}
