import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink to="/" className="logo fs-4">
      <span>PopcornTime</span>
    </NavLink>
  );
}
