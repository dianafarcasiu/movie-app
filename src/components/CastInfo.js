import React, { useEffect, useState } from "react";

export default function CastInfo({ type, ID, options }) {
  const [cast, setCast] = useState([]);

  useEffect(
    function () {
      async function getCastInfo() {
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${ID}/credits?language=en-US`,
          options
        );
        const data = await res.json();
        setCast(data.cast.slice(0, 5));
      }
      getCastInfo();
    },
    [type, ID, options]
  );

  return (
    <p
      className="cast-info"
      style={{ display: cast.length < 1 ? "none" : "block" }}
    >
      Cast:{" "}
      {cast.map((actor, idx) => (
        <React.Fragment key={actor.id}>
          <span>{actor.name}</span>
          {idx !== cast.length - 1 && <span>, </span>}
        </React.Fragment>
      ))}
    </p>
  );
}
