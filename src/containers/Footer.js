import { useContext } from "react";
import { DarkModeContext } from "../App";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { lightModeOn } = useContext(DarkModeContext);

  return (
    <footer className={`${lightModeOn ? "light" : ""} text-center p-3`}>
      <h6 className="py-2 footer-logo">PopcornTime</h6>
      {/* <div className="footer-underline"></div> */}
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
