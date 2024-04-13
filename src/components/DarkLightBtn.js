import { useContext } from "react";
import { DarkModeContext } from "../App";

export default function DarkLightBtn() {
  const { lightModeOn, toggleLightMode } = useContext(DarkModeContext);

  return (
    <div className="dark-light-btn">
      <input
        type="checkbox"
        id="checkbox"
        className="checkbox"
        checked={lightModeOn}
        onChange={() => toggleLightMode()}
      />
      <label
        htmlFor="checkbox"
        className={`checkbox-label ${lightModeOn ? "light" : ""}`}
      >
        <i className="fa-regular fa-sun"></i>{" "}
        <i className="fa-solid fa-moon"></i>
        <span className="ball"></span>
      </label>
    </div>
  );
}
