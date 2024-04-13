import { useContext } from "react";
import { DarkModeContext } from "../App";

export default function Heading({ children }) {
  const { lightModeOn } = useContext(DarkModeContext);

  return (
    <div className={`heading ${lightModeOn ? "light" : ""}`}>
      <h4>{children}</h4>
      <div className={`underline ${lightModeOn ? "light" : ""}`}></div>
    </div>
  );
}
