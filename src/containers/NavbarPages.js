import { NavLink } from "react-router-dom";

export default function NavbarPages() {
  return (
    <ul className="navbar-list d-flex align-items-center m-0 p-0 gap-md-4 gap-sm-2 gap-xs-2">
      <li>
        <NavLink to="/">
          <i className="fa-solid fa-house"></i>
          <span className="navbar-page">Home</span>
          <div className="underline"></div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/movies">
          <i className="fa-solid fa-film"></i>
          <span className="navbar-page">Movies</span>
          <div className="underline"></div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/series">
          <i className="fa-solid fa-clapperboard"></i>
          <span className="navbar-page">Series</span>
          <div className="underline"></div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span className="navbar-page">Search</span>
          <div className="underline"></div>
        </NavLink>
      </li>
      <li>
        <NavLink to="/watchlist">
          <i className="fa-solid fa-plus"></i>
          <span className="navbar-page">Watchlist</span>
          <div className="underline"></div>
        </NavLink>
      </li>
    </ul>
  );
}
