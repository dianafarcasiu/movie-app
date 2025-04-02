import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function SearchBar({ value, onChange, query, setQuery }) {
  const [isFocused, setIsFocused] = useState(false);
  const { lightModeOn } = useTheme();

  return (
    <form className="search-form">
      <input
        type="text"
        placeholder="Search for your favorite movies & series..."
        className={`search-bar ${lightModeOn ? "light" : ""}`}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && query && (
        <i
          className={`fa-solid fa-xmark delete-query-btn ${
            lightModeOn ? "light" : ""
          }`}
          onMouseDown={() => setQuery("")}
        ></i>
      )}
    </form>
  );
}
