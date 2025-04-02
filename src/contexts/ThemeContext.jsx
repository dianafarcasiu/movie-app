import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [lightModeOn, setLightModeOn] = useState(false);

  function toggleLightMode() {
    setLightModeOn((prevMode) => !prevMode);
  }
  useEffect(
    function () {
      document.body.classList.toggle("light", lightModeOn);
    },
    [lightModeOn]
  );

  return (
    <ThemeContext.Provider value={{ lightModeOn, toggleLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Function used outside the provider.");
  return context;
}

export { ThemeProvider, useTheme };
