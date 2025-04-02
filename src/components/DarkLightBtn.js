import { useTheme } from "../contexts/ThemeContext";

export default function DarkLightBtn() {
  const { lightModeOn, toggleLightMode } = useTheme();

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
