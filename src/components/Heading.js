import { useTheme } from "../contexts/ThemeContext";

export default function Heading({ children }) {
  const { lightModeOn } = useTheme();

  return (
    <div className={`heading ${lightModeOn ? "light" : ""}`}>
      <h4>{children}</h4>
      <div className={`underline ${lightModeOn ? "light" : ""}`}></div>
    </div>
  );
}
