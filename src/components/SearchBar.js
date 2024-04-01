import { useState } from "react";

export default function SearchBar({ value, onChange, query, setQuery }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Search for your favorite movies & series..."
        className="search-bar"
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && query && (
        <i
          className="fa-solid fa-xmark delete-query-btn"
          onMouseDown={() => setQuery("")}
        ></i>
      )}
    </form>
  );
}
