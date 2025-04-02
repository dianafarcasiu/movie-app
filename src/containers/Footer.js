import { NavLink } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { lightModeOn } = useTheme();

  return (
    <footer className={`${lightModeOn ? "light" : ""} text-center p-3`}>
      <h6 className="py-2 footer-logo">PopcornTime</h6>
      <ul className="footer-nav d-flex justify-content-center align-items-center gap-4">
        <li>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/movies">
            <span>Movies</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/series">
            <span>Series</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/search">
            <span>Search</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/watchlist">
            <span>Watchlist</span>
          </NavLink>
        </li>
      </ul>
      <small>Copyright © PopcornTime 2024.</small>
    </footer>
  );
}
