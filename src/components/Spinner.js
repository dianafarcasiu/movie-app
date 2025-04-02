import { useTheme } from "../contexts/ThemeContext";

function Spinner() {
  const { lightModeOn } = useTheme();
  return (
    <div className="spinner-container">
      <div className={`spinner ${lightModeOn ? "light" : ""}`}></div>
    </div>
  );
}

export default Spinner;
